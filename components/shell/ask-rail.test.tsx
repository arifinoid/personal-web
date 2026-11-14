import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AskRail } from "@/components/shell/ask-rail";

type FetchHandler = (url: string, init?: RequestInit) => Promise<Response> | Response;

function stubFetch(handler: FetchHandler) {
  const fetchMock = vi.fn((input: RequestInfo | URL, init?: RequestInit) =>
    handler(String(input), init),
  );
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const health = () => jsonResponse({ status: "ok" });

const renderRail = () => {
  const onClose = vi.fn();
  render(<AskRail onCloseAction={onClose} />);
  return { onClose };
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("AskRail", () => {
  it("shows the backend as online once the health check succeeds", async () => {
    stubFetch(() => health());
    renderRail();

    expect(await screen.findByText("online")).toBeInTheDocument();
  });

  it("shows the backend as offline when the health check fails", async () => {
    stubFetch(() => Promise.reject(new Error("boom")));
    renderRail();

    expect(await screen.findByText("offline")).toBeInTheDocument();
  });

  it("renders the starter templates", () => {
    stubFetch(() => health());
    renderRail();

    expect(screen.getByText("What projects has Rohmad built?")).toBeInTheDocument();
    expect(screen.getByText("Where does he work now?")).toBeInTheDocument();
  });

  it("posts the template question and renders the answer", async () => {
    const fetchMock = stubFetch((url) =>
      url.endsWith("/v1/chat")
        ? jsonResponse({
            answer: "Rohmad has built several projects across his career:\n• Payment platform",
            sources: [{ title: "Projects", url: "/projects/", snippet: "Payment platform" }],
            retrieval_only: true,
          })
        : health(),
    );
    renderRail();

    await userEvent.click(screen.getByText("What projects has Rohmad built?"));

    expect(await screen.findByText(/Payment platform/)).toBeInTheDocument();

    const chatCall = fetchMock.mock.calls.find(([url]) => String(url).endsWith("/v1/chat"));
    expect(chatCall).toBeDefined();
    expect(chatCall?.[1]).toMatchObject({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "What projects has Rohmad built?" }),
    });
  });

  it("renders markdown links from the answer as anchors", async () => {
    stubFetch((url) =>
      url.endsWith("/v1/chat")
        ? jsonResponse({ answer: "See [Projects](/projects/) for details.", retrieval_only: true })
        : health(),
    );
    renderRail();

    await userEvent.click(screen.getByText("What projects has Rohmad built?"));

    const link = await screen.findByRole("link", { name: "Projects" });
    expect(link).toHaveAttribute("href", "/projects/");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("surfaces a non-ok response as an error bubble", async () => {
    stubFetch((url) => (url.endsWith("/v1/chat") ? jsonResponse({}, 500) : health()));
    renderRail();

    await userEvent.type(screen.getByPlaceholderText("Ask about the site…"), "projects{enter}");

    expect(await screen.findByText("server responded 500")).toBeInTheDocument();
  });

  it("does not submit an empty question", async () => {
    const fetchMock = stubFetch(() => health());
    renderRail();

    await userEvent.type(screen.getByPlaceholderText("Ask about the site…"), "   {enter}");

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1)); // health only
  });

  it("closes through the close button", async () => {
    stubFetch(() => health());
    const { onClose } = renderRail();

    await userEvent.click(screen.getByRole("button", { name: "Close ask panel" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

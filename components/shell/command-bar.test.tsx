import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CommandBar } from "@/components/shell/command-bar";

function renderBar(overrides: Partial<Parameters<typeof CommandBar>[0]> = {}) {
  const onCommand = vi.fn();
  const setTheme = vi.fn();
  render(<CommandBar theme="moon" setTheme={setTheme} onCommand={onCommand} {...overrides} />);
  return { onCommand, setTheme };
}

const openPalette = async () => {
  await userEvent.keyboard("{Meta>}k{/Meta}");
  return screen.findByRole("dialog", { name: "Command palette" });
};

describe("CommandBar", () => {
  it("opens the palette with Cmd+K and closes it with Escape", async () => {
    renderBar();

    const dialog = await openPalette();
    expect(dialog).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("runs the typed command on Enter", async () => {
    const { onCommand } = renderBar();

    const input = screen.getByLabelText("Run Neovim command");
    await userEvent.type(input, ":e /projects{enter}");

    expect(onCommand).toHaveBeenCalledWith(":e /projects");
    expect(input).toHaveValue("");
  });

  it("runs a palette command when its entry is clicked", async () => {
    const { onCommand } = renderBar();

    await openPalette();
    await userEvent.click(screen.getByRole("button", { name: ":ask" }));

    expect(onCommand).toHaveBeenCalledWith(":ask");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("ignores blank input", async () => {
    const { onCommand } = renderBar();

    await userEvent.type(screen.getByLabelText("Run Neovim command"), "   {enter}");

    expect(onCommand).not.toHaveBeenCalled();
  });

  it("toggles from moon to day", async () => {
    const { setTheme } = renderBar({ theme: "moon" });

    await userEvent.click(screen.getByRole("button", { name: "Switch to day theme" }));

    expect(setTheme).toHaveBeenCalledWith("day");
  });

  it("offers the moon theme when the day theme is active", async () => {
    renderBar({ theme: "day" });

    expect(screen.getByRole("button", { name: "Switch to moon theme" })).toBeInTheDocument();
  });
});

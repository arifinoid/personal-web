import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  delete document.documentElement.dataset.theme;
});

// jsdom has no layout engine; the ask rail calls this after every message.
Element.prototype.scrollIntoView = vi.fn();

// Node ships AbortSignal.timeout, but jsdom can shadow the constructor.
if (typeof AbortSignal.timeout !== "function") {
  AbortSignal.timeout = (ms: number) => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(new DOMException("Timeout", "TimeoutError")), ms);
    return controller.signal;
  };
}

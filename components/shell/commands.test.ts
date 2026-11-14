import { describe, expect, it } from "vitest";

import { parseCommand } from "@/components/shell/commands";

describe("parseCommand", () => {
  it("opens a known route with the :e shorthand", () => {
    expect(parseCommand(":e /projects")).toEqual({ action: "open", route: "/projects" });
  });

  it("opens a known route with the :edit name", () => {
    expect(parseCommand(":edit /about")).toEqual({ action: "open", route: "/about" });
  });

  it("adds a leading slash when the route is bare", () => {
    expect(parseCommand(":e projects")).toEqual({ action: "open", route: "/projects" });
  });

  it("is case insensitive and trims surrounding whitespace", () => {
    expect(parseCommand("  :E /Blog  ")).toEqual({ action: "open", route: "/blog" });
  });

  it("reports routes that have no buffer", () => {
    expect(parseCommand(":e /nope")).toEqual({ action: "no-buffer", route: "/nope" });
  });

  it("switches the theme", () => {
    expect(parseCommand(":theme day")).toEqual({ action: "theme", mode: "day" });
    expect(parseCommand(":theme moon")).toEqual({ action: "theme", mode: "moon" });
  });

  it("toggles the ask panel", () => {
    expect(parseCommand(":ask")).toEqual({ action: "ask" });
  });

  it("opens help", () => {
    expect(parseCommand(":help")).toEqual({ action: "help" });
  });

  it("jumps home", () => {
    expect(parseCommand(":home")).toEqual({ action: "open", route: "/" });
  });

  it("keeps the raw text for unknown commands", () => {
    expect(parseCommand(" :wq ")).toEqual({ action: "unknown", raw: " :wq " });
  });

  it("treats a bare command without an argument as unknown", () => {
    expect(parseCommand(":e")).toEqual({ action: "unknown", raw: ":e" });
  });
});

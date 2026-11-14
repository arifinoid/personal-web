import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useTheme } from "@/components/shell/use-theme";

describe("useTheme", () => {
  it("defaults to the moon theme", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current[0]).toBe("moon");
  });

  it("restores a stored theme after mount", () => {
    window.localStorage.setItem("theme", "day");

    const { result } = renderHook(() => useTheme());

    expect(result.current[0]).toBe("day");
    expect(document.documentElement.dataset.theme).toBe("day");
  });

  it("ignores stored values that are not themes", () => {
    window.localStorage.setItem("theme", "neon");

    const { result } = renderHook(() => useTheme());

    expect(result.current[0]).toBe("moon");
  });

  it("applies and persists theme changes", () => {
    const { result } = renderHook(() => useTheme());

    act(() => result.current[1]("day"));

    expect(result.current[0]).toBe("day");
    expect(document.documentElement.dataset.theme).toBe("day");
    expect(window.localStorage.getItem("theme")).toBe("day");
  });
});

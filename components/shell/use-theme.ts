"use client";

import { useCallback, useEffect, useState } from "react";

import type { ThemeMode } from "@/components/shell/types";

const STORAGE_KEY = "theme";
const TRANSITION_SUPPRESSOR = "*,*::before,*::after{transition:none !important}";

function getStoredTheme(): ThemeMode | null {
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "moon" || value === "day" ? value : null;
}

/**
 * Theme lives on <html data-theme> so CSS custom properties apply without a
 * re-render. The initial value is read from localStorage after mount; the
 * server always renders "moon", hence suppressHydrationWarning on <html>.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>("moon");

  useEffect(() => {
    const stored = getStoredTheme();
    if (stored && stored !== document.documentElement.dataset.theme) {
      applyTheme(stored);
      setThemeState(stored);
    }
  }, []);

  const setTheme = useCallback((value: ThemeMode) => {
    applyTheme(value);
    window.localStorage.setItem(STORAGE_KEY, value);
    setThemeState(value);
  }, []);

  return [theme, setTheme] as const;
}

// Disable transitions while the theme flips, otherwise every color transition
// fires at once and the switch smears.
function applyTheme(value: ThemeMode) {
  const style = document.createElement("style");
  style.append(document.createTextNode(TRANSITION_SUPPRESSOR));
  document.head.append(style);
  document.documentElement.dataset.theme = value;
  void document.body.offsetHeight; // force a synchronous style flush
  requestAnimationFrame(() => {
    requestAnimationFrame(() => style.remove());
  });
}

"use client";

import { useCallback, useEffect, useState } from "react";

import type { ThemeMode } from "@/components/shell/types";

const STORAGE_KEY = "theme";

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
      document.documentElement.dataset.theme = stored;
      setThemeState(stored);
    }
  }, []);

  const setTheme = useCallback((value: ThemeMode) => {
    document.documentElement.dataset.theme = value;
    window.localStorage.setItem(STORAGE_KEY, value);
    setThemeState(value);
  }, []);

  return [theme, setTheme] as const;
}

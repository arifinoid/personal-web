"use client";

import Link from "next/link";
import { Search } from "lucide-react";

import type { ThemeMode } from "@/components/shell/types";

export function Topbar({
  theme,
  currentPath,
  onHelp,
}: {
  theme: ThemeMode;
  currentPath: string;
  onHelp: () => void;
}) {
  return (
    <header className="topbar">
      <Link href="/" className="topbar-brand">
        <span className="brand-glyph">⌁</span>
        <span>arifinoid@kediri</span>
        <span className="brand-divider">/</span>
        <span className="muted-text">devfolio</span>
      </Link>
      <div className="topbar-center">
        <span className="live-dot" /> <span>session active</span>
        <span className="topbar-path">
          ~/work/{currentPath === "/" ? "index" : currentPath.slice(1)}
        </span>
      </div>
      <div className="topbar-actions">
        <span className="topbar-theme">
          <span className={`theme-swatch ${theme}`} /> {theme === "moon" ? "moon" : "day"}
        </span>
        <button
          className="search-trigger"
          onClick={onHelp}
          aria-label="Open command hint"
          type="button"
        >
          <Search size={15} />
        </button>
      </div>
    </header>
  );
}

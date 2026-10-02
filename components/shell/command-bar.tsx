"use client";

import { useEffect, useRef, useState } from "react";
import { Command, Moon, Sun, X } from "lucide-react";
import type { ThemeMode } from "@/components/shell/types";

const commands = [
  ":e /",
  ":e /explore",
  ":e /projects",
  ":e /blog",
  ":e /about",
  ":theme day",
  ":theme moon",
  ":help",
];

export function CommandBar({
  theme,
  setTheme,
  onCommand,
}: {
  theme: ThemeMode;
  setTheme: (value: ThemeMode) => void;
  onCommand: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const submit = () => {
    if (!value.trim()) return;
    onCommand(value.trim());
    setValue("");
  };

  const close = () => {
    setOpen(false);
    restoreFocusRef.current?.focus();
    restoreFocusRef.current = null;
  };

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => {
          if (!current) {
            restoreFocusRef.current = document.activeElement as HTMLElement | null;
          }
          return !current;
        });
      }
      if (event.key === "Escape") {
        setOpen(false);
        restoreFocusRef.current?.focus();
        restoreFocusRef.current = null;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <>
      {open && (
        <div
          className="command-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="command-palette">
            <div className="palette-head">
              <Command size={15} />
              <span>command palette</span>
              <button onClick={close} aria-label="Close commands">
                <X size={15} />
              </button>
            </div>
            <input
              ref={inputRef}
              autoFocus
              placeholder="Type a command…"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submit();
                  close();
                }
                if (event.key === "Escape") close();
              }}
            />
            <div className="palette-list">
              {commands.map((command) => (
                <button
                  key={command}
                  onClick={() => {
                    onCommand(command);
                    setValue("");
                    close();
                  }}
                >
                  {command}
                </button>
              ))}
            </div>
            <div className="palette-foot">
              <span>
                <kbd>↵</kbd> run
              </span>
              <span>
                <kbd>esc</kbd> close
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="command-bar">
        <span className="command-prompt">:</span>
        <input
          aria-label="Run Neovim command"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setOpen(false)}
          onKeyDown={(event) => event.key === "Enter" && submit()}
          placeholder="type a command…"
        />
        <span className="command-hint">⌘K</span>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "moon" ? "day" : "moon")}
          aria-label={`Switch to ${theme === "moon" ? "day" : "moon"} theme`}
        >
          {theme === "moon" ? <Sun size={15} /> : <Moon size={15} />}
          <span>{theme === "moon" ? "day" : "moon"}</span>
        </button>
      </div>
    </>
  );
}

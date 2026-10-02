"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { match, P } from "ts-pattern";

import { CommandBar } from "@/components/shell/command-bar";
import { ExplorerRail } from "@/components/shell/explorer-rail";
import { navItems } from "@/components/shell/nav";
import { StatusLine } from "@/components/shell/status-line";
import { Topbar } from "@/components/shell/topbar";
import { useTheme } from "@/components/shell/use-theme";
import type { ThemeMode } from "@/components/shell/types";

const READY_STATUS = "ready — press ⌘K for commands";

type Command =
  | { action: "open"; route: string }
  | { action: "no-buffer"; route: string }
  | { action: "theme"; mode: ThemeMode }
  | { action: "help" }
  | { action: "unknown"; raw: string };

const parseCommand = (command: string): Command => {
  const normalized = command.toLowerCase().trim();
  const arg = normalized.match(/^(?::e|:edit)\s+(\S+)$/)?.[1];
  const route = arg && (arg.startsWith("/") ? arg : `/${arg}`);

  if (route && navItems.some((item) => item.href === route)) return { action: "open", route };
  if (route) return { action: "no-buffer", route };
  if (normalized === ":theme day") return { action: "theme", mode: "day" };
  if (normalized === ":theme moon") return { action: "theme", mode: "moon" };
  if (normalized === ":help") return { action: "help" };
  if (normalized === ":home") return { action: "open", route: "/" };
  return { action: "unknown", raw: command };
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const currentPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const [theme, setTheme] = useTheme();
  const [commandStatus, setCommandStatus] = useState(READY_STATUS);

  const pageIndex = useMemo(
    () => navItems.findIndex((item) => item.href === currentPath),
    [currentPath],
  );

  const onCommand = (command: string) => {
    match(parseCommand(command))
      .with({ action: "open", route: P.select() }, (route) => {
        router.push(route);
        setCommandStatus(`opened ${route}`);
      })
      .with({ action: "no-buffer", route: P.select() }, (route) => {
        setCommandStatus(`no buffer: ${route}`);
      })
      .with({ action: "theme", mode: P.select() }, (mode) => {
        setTheme(mode);
        setCommandStatus(`theme set to ${mode}`);
      })
      .with({ action: "help" }, () => {
        setCommandStatus("try :e /projects, :theme day, or ⌘K");
      })
      .with({ action: "unknown", raw: P.select() }, (raw) => {
        setCommandStatus(`unknown command: ${raw}`);
      })
      .exhaustive();
  };

  return (
    <div className="app-frame">
      <Topbar theme={theme} currentPath={currentPath} onHelp={() => onCommand(":help")} />
      <div className="workspace">
        <ExplorerRail currentPath={currentPath} />
        <main className="editor-pane">
          <div className="tab-strip">
            <div className="tab active">
              <span className="tab-dot" />{" "}
              {currentPath === "/" ? "index.tsx" : `${currentPath.slice(1)}.tsx`}{" "}
              <span className="tab-close">×</span>
            </div>
            <div className="tab-count">
              {String(Math.max(pageIndex + 1, 1)).padStart(2, "0")} /{" "}
              {String(navItems.length).padStart(2, "0")}
            </div>
          </div>
          <div className="editor-content">{children}</div>
          <div className="command-status">
            <span className="command-status-prompt">➜</span> {commandStatus}
          </div>
          <CommandBar theme={theme} setTheme={setTheme} onCommand={onCommand} />
          <StatusLine theme={theme} currentPath={currentPath} />
        </main>
      </div>
    </div>
  );
}

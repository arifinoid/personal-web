"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { CommandBar } from "@/components/shell/command-bar";
import { ExplorerRail } from "@/components/shell/explorer-rail";
import { navItems } from "@/components/shell/nav";
import { StatusLine } from "@/components/shell/status-line";
import { Topbar } from "@/components/shell/topbar";
import { useTheme } from "@/components/shell/use-theme";

const READY_STATUS = "ready — press ⌘K for commands";

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
    const normalized = command.toLowerCase().trim();
    const routeMatch = normalized.match(/(?:^:e\s+|^:edit\s+)(\S+)/);
    if (routeMatch) {
      const route = routeMatch[1].startsWith("/") ? routeMatch[1] : `/${routeMatch[1]}`;
      const known = navItems.some((item) => item.href === route);
      if (known) {
        router.push(route);
        setCommandStatus(`opened ${route}`);
      } else {
        setCommandStatus(`no buffer: ${route}`);
      }
    } else if (normalized === ":theme day") {
      setTheme("day");
      setCommandStatus("theme set to day");
    } else if (normalized === ":theme moon") {
      setTheme("moon");
      setCommandStatus("theme set to moon");
    } else if (normalized === ":help") {
      setCommandStatus("try :e /projects, :theme day, or ⌘K");
    } else if ([":home", ":e /"].includes(normalized)) {
      router.push("/");
      setCommandStatus("opened /");
    } else {
      setCommandStatus(`unknown command: ${command}`);
    }
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

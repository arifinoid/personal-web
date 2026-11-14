"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Keyboard } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { navItems } from "@/components/shell/nav";
import { ASK_API_URL } from "@/lib/ask-api";
import { site } from "@/lib/site";

export function ExplorerRail({ currentPath }: { currentPath: string }) {
  const [apiStatus, setApiStatus] = useState<"online" | "offline" | "unknown">("unknown");

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const res = await fetch(`${ASK_API_URL}/health`, { signal: AbortSignal.timeout(3000) });
        if (!cancelled) setApiStatus(res.ok ? "online" : "offline");
      } catch {
        if (!cancelled) setApiStatus("offline");
      }
    };
    check();
    const timer = setInterval(check, 15000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  const dotColor =
    apiStatus === "online"
      ? "var(--green)"
      : apiStatus === "offline"
        ? "var(--red)"
        : "var(--comment)";
  const dotText =
    apiStatus === "online" ? "online" : apiStatus === "offline" ? "offline" : "unknown";

  return (
    <aside className="explorer-rail" aria-label="Site navigation">
      <div className="rail-label">buffers</div>
      <nav className="rail-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.href === currentPath;
          return (
            <Link
              aria-current={active ? "page" : undefined}
              className={`rail-item ${active ? "active" : ""}`}
              href={item.href}
              key={item.href}
              title={`Open ${item.label}`}
            >
              <Icon size={16} strokeWidth={1.8} />
              <span>{item.label}</span>
              {active && <span className="rail-cursor" />}
            </Link>
          );
        })}
      </nav>
      <div className="rail-divider" />
      <div className="rail-label">session</div>
      <div className="rail-meta">
        <span
          className="status-dot"
          style={{
            background: dotColor,
            boxShadow: `0 0 0 3px color-mix(in srgb, ${dotColor} 12%, transparent)`,
          }}
        />
        <span style={{ color: dotColor }}>{dotText}</span>
      </div>
      <div className="rail-meta muted">
        <Keyboard size={13} /> <span>⌘K commands</span>
      </div>
      <div className="rail-socials">
        <a href={site.github} aria-label="GitHub">
          <GithubIcon size={15} />
        </a>
        <a href={site.linkedin} aria-label="LinkedIn">
          <LinkedinIcon size={15} />
        </a>
      </div>
    </aside>
  );
}

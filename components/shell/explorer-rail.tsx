"use client";

import Link from "next/link";
import { Keyboard } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { navItems } from "@/components/shell/nav";
import { site } from "@/lib/site";

export function ExplorerRail({ currentPath }: { currentPath: string }) {
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
        <span className="status-dot" /> <span>online</span>
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

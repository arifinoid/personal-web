import { FileCode, FolderGit2, PanelsTopLeft, Terminal, Zap } from "lucide-react";

import type { NavItem } from "@/components/shell/types";

export const navItems: readonly NavItem[] = [
  { href: "/", label: "index", icon: Terminal },
  { href: "/explore", label: "experience", icon: PanelsTopLeft },
  { href: "/projects", label: "projects", icon: FolderGit2 },
  { href: "/blog", label: "blog", icon: FileCode },
  { href: "/about", label: "about", icon: Zap },
];

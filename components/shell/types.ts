import type { LucideIcon } from "lucide-react";

export type ThemeMode = "moon" | "day";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

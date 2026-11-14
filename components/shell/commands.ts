import { navItems } from "@/components/shell/nav";
import type { ThemeMode } from "@/components/shell/types";

export type Command =
  | { action: "open"; route: string }
  | { action: "no-buffer"; route: string }
  | { action: "theme"; mode: ThemeMode }
  | { action: "ask" }
  | { action: "help" }
  | { action: "unknown"; raw: string };

/**
 * Parse a Neovim-flavoured command typed into the command bar or palette.
 * Pure on purpose: the shell only has to switch on the returned action.
 */
export const parseCommand = (command: string): Command => {
  const normalized = command.toLowerCase().trim();
  const arg = normalized.match(/^(?::e|:edit)\s+(\S+)$/)?.[1];
  const route = arg && (arg.startsWith("/") ? arg : `/${arg}`);

  if (route && navItems.some((item) => item.href === route)) return { action: "open", route };
  if (route) return { action: "no-buffer", route };
  if (normalized === ":theme day") return { action: "theme", mode: "day" };
  if (normalized === ":theme moon") return { action: "theme", mode: "moon" };
  if (normalized === ":ask") return { action: "ask" };
  if (normalized === ":help") return { action: "help" };
  if (normalized === ":home") return { action: "open", route: "/" };
  return { action: "unknown", raw: command };
};

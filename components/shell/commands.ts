import { match, P } from "ts-pattern";

import { navItems } from "@/components/shell/nav";
import type { ThemeMode } from "@/components/shell/types";

export type Command =
  | { action: "open"; route: string }
  | { action: "no-buffer"; route: string }
  | { action: "theme"; mode: ThemeMode }
  | { action: "ask" }
  | { action: "help" }
  | { action: "unknown"; raw: string };

const knownRoutes = new Set(navItems.map((item) => item.href));

/**
 * Parse a Neovim-flavoured command typed into the command bar or palette.
 * Pure on purpose: the shell only has to switch on the returned action.
 */
export const parseCommand = (command: string): Command => {
  const normalized = command.toLowerCase().trim();
  const arg = normalized.match(/^(?::e|:edit)\s+(\S+)$/)?.[1];
  const route = arg ? (arg.startsWith("/") ? arg : `/${arg}`) : null;

  return match({ normalized, route })
    .returnType<Command>()
    .with(
      {
        route: P.when(
          (route): route is string => typeof route === "string" && knownRoutes.has(route),
        ),
      },
      ({ route }) => ({ action: "open", route }),
    )
    .with({ route: P.nonNullable }, ({ route }) => ({ action: "no-buffer", route }))
    .with({ normalized: ":theme day" }, () => ({ action: "theme", mode: "day" }))
    .with({ normalized: ":theme moon" }, () => ({ action: "theme", mode: "moon" }))
    .with({ normalized: ":ask" }, () => ({ action: "ask" }))
    .with({ normalized: ":help" }, () => ({ action: "help" }))
    .with({ normalized: ":home" }, () => ({ action: "open", route: "/" }))
    .otherwise(() => ({ action: "unknown", raw: command }));
};

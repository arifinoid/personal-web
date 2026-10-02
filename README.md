# arifinoid.dev

Personal portfolio of [Rohmad Arifin](https://github.com/arifinoid) — fullstack software
engineer. Neovim-inspired single-page shell with command palette, theme switching, and a
fully static build.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack) + React 19 + TypeScript (strict)
- [Tailwind CSS](https://tailwindcss.com) v4 + custom design tokens on CSS variables
- [lucide-react](https://lucide.dev) icons
- Fonts self-hosted at build time via `next/font` (Manrope, IBM Plex Mono)
- [Bun](https://bun.sh) package manager, [Nix](https://nixos.org) flake dev shell

## Development

```bash
nix develop          # optional: reproducible dev shell with pre-commit hooks
bun install
bun run dev          # http://localhost:3000
```

## Commands

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `bun run build`      | Production build (static prerender)  |
| `bun run start`      | Serve the production build           |
| `bun run typecheck`  | `tsc --noEmit`                       |
| `bun run lint`       | oxlint                               |
| `bun run format`     | oxfmt (write)                        |
| `bun run format:check` | oxfmt (check)                      |

On the site itself: `⌘K` / `Ctrl+K` opens the command palette; `:e /projects` navigates,
`:theme day` / `:theme moon` switch themes (persisted in `localStorage`).

## Structure

```
app/                  # routes: /, /about, /blog, /explore, /projects
app/globals.css       # design tokens + component classes
components/shell/     # Neovim-style app shell (topbar, rail, command bar)
components/brand-icons.tsx
lib/site.ts           # single source of truth for name, links, email
```

## Deployment

Static export via `next build` — deploy to any Node host or Vercel as-is.

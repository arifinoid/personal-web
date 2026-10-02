---
name: Cloudflare Pages setup
description: Static export deployment pipeline for Cloudflare Pages
---

# Static export

`next.config.ts` sets `output: "export"` — `bun run build` emits static files to
`out/`. No Node server; pages are prerendered HTML.

Constraints imposed by static export (do not remove without re-checking
`docs/01-app/02-guides/static-exports.md`):

- `images: { unoptimized: true }` — default loader needs a server.
- `app/robots.ts` and `app/sitemap.ts` export `dynamic = "force-static"`.
- No route handlers reading `Request`, no rewrites/headers/redirects in
  `next.config.ts`, no server actions, no dynamic routes without
  `generateStaticParams`.

# Deploy

`.github/workflows/deploy.yml` runs on push to `main`:
typecheck → lint → format:check → build → `wrangler pages deploy out`.

Required GitHub repo secrets:

- `CLOUDFLARE_API_TOKEN` — template "Edit Cloudflare Workers", permission
  `Cloudflare Pages: Edit`, account resource scoped to the target account.
- `CLOUDFLARE_ACCOUNT_ID` — visible on the Cloudflare dashboard home page.

`wrangler.toml` pins the Pages project: `name = "arifinoid"`,
`pages_build_output_dir = "./out"`. The project (`arifinoid.pages.dev`) must
already exist in the Cloudflare account; `wrangler pages deploy` targets it by
name.

Connection to a custom domain (`arifinoid.dev`, referenced in `lib/site.ts`
for `metadataBase`/sitemap/robots) is configured in the Cloudflare dashboard:
Pages project → Custom domains.

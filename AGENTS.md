# AGENTS.md

## Commands

```
pnpm dev       # dev server (port 3000)
pnpm build     # production build
pnpm start     # serve production build
pnpm lint      # ESLint (flat config)
```

Always use `pnpm`, not `npm` or `yarn`.

## Stack

- **Next.js 16** (App Router) — breaking changes from earlier versions. Read `node_modules/next/dist/docs/` or the online docs before writing code. Heed deprecation warnings.
- **React 19**
- **Tailwind CSS v4** — uses `@import "tailwindcss"` in `globals.css`, NOT the old `@tailwind` directives. PostCSS plugin is `@tailwindcss/postcss`.
- **TypeScript strict** — path alias `@/*` maps to project root.

## Structure

- `app/` — App Router entrypoint. `layout.tsx` wraps all pages. `page.tsx` is the home route.
- `public/` — static assets served at root.
- No test framework is configured. No CI is configured.

## Gotchas

- Tailwind v4 theming uses `@theme inline` blocks in `globals.css`, not `tailwind.config.js`.
- ESLint uses flat config (`eslint.config.mjs`), not `.eslintrc`.
- `next.config.ts` is TypeScript, not JS.
- No `tailwind.config.*` file exists — Tailwind v4 auto-detects content.

# Current Feature

NextAuth v5 — PENDING

## Spec

`@context/features/auth/index.md` (to be created)

## Status

Not started. Database feature complete. Ready to implement auth.

## Next Steps

1. Create `context/features/auth/` spec folder with stage files
2. Create feature branch `feature/auth`
3. Implement NextAuth v5 with email/password

## Current Branch

`main`

---

## History

### Neon PostgreSQL + Prisma 7 — COMPLETE
- Stage 1 — Neon init, Prisma 7 install, base schema, first migration
- Stage 2 — NextAuth models, cascade deletes, indexes, migration applied
- Stage 3 — `lib/prisma.ts` singleton (`pg` + `@prisma/adapter-pg`)
- Stage 4 — `DIRECT_URL` support in `prisma.config.ts`, branch strategy documented
- Stage 5 — `build`: `prisma migrate deploy && next build`, `postinstall`: `prisma generate`

### Dashboard Layout — COMPLETE
- Stage 1 (Setup) — ShadCN initialized, dark mode configured, 14 components installed
- Stage 2 (App Shell) — Sidebar, Header, AppShell, mock-data in `lib/mock-data.ts`
- Stage 3 (Dashboard Page) — stats cards, engagement chart, top posts panel, recent posts list
- Stage 4 (Create Post Page) — editor, media upload, platform selector, schedule picker, action buttons
- Stage 5 (Scheduled Posts Page) — filter tabs, post grid, preview sidebar, calendar with dot indicators
- Stage 6 (Connected Accounts Page) — account cards, limits progress bars, upgrade banner
- Stage 7 (Settings Page) — three stacked settings cards with chevron navigation

## Routes

| Route | Page |
|---|---|
| `/dashboard` | Dashboard with stats and engagement chart |
| `/create` | Create Post with editor and scheduler |
| `/scheduled` | Scheduled Posts with filter tabs and calendar |
| `/accounts` | Connected Accounts with limits and upgrade banner |
| `/settings` | Settings cards |

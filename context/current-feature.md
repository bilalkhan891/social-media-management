# Current Feature

Neon PostgreSQL + Prisma 7 — COMPLETE

## Spec

`@context/features/database-spec.md`

## Status

All 5 stages complete. Build passes. Ready for next feature.

## Stages

### Stage 1 — Base Setup ✅
- Neon project initialized via `neonctl`
- `.env` created with `DATABASE_URL` (gitignored)
- Prisma 7 installed (`prisma`, `@prisma/client`, `dotenv`)
- `prisma.config.ts` — Prisma 7 config wiring connection URL
- `prisma/schema.prisma` — models: `User`, `SocialAccount`, `Post`, `PostTarget`
- Migration `20260601113910_init` applied to Neon

### Stage 2 — Complete Schema ✅
- Added NextAuth models: `Account`, `Session`, `VerificationToken`
- Added cascade deletes on all relations
- Added indexes on foreign keys and frequently queried fields
- Migration `20260601170705_add_nextauth_models_and_indexes` applied

### Stage 3 — Prisma Client Singleton ✅
- `lib/prisma.ts` — singleton using `pg` + `@prisma/adapter-pg` (Prisma 7 requires adapter)
- Import path: `@/lib/generated/prisma/client` (not `@prisma/client`)
- `postinstall: prisma generate` added to `package.json` for Vercel

### Stage 4 — Neon Branch Strategy ✅
- `prisma.config.ts` updated to use `DIRECT_URL ?? DATABASE_URL` for migrations
- `.env` documented with pooled vs direct URL guidance
- Production branch setup documented (manual step before first Vercel deploy)

### Stage 5 — Production Deployment Config ✅
- `build` script: `prisma migrate deploy && next build`
- `postinstall` script: `prisma generate`
- Build passes ✓

## Current Branch

`main`

## Notes

- Always use `prisma migrate dev` for schema changes — never `db push`
- Prisma 7 has breaking changes — config lives in `prisma.config.ts`, not `schema.prisma`
- Spec ref: `@context/features/database-spec.md`

---

## History

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

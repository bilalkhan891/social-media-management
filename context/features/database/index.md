# Database Integration — Feature Index

Neon PostgreSQL + Prisma 7 setup, schema design, and migration strategy.

Spec: `@context/features/database-spec.md`

## Stages

| Stage | File | Status | Description |
|---|---|---|---|
| 1 | [stage-1-base-setup.md](stage-1-base-setup.md) | ✅ Complete | Neon init, Prisma 7 install, base schema, first migration |
| 2 | [stage-2-complete-schema.md](stage-2-complete-schema.md) | ⬜ Pending | NextAuth models, cascade deletes, indexes |
| 3 | [stage-3-prisma-client.md](stage-3-prisma-client.md) | ⬜ Pending | Prisma client singleton for Next.js |
| 4 | [stage-4-branch-strategy.md](stage-4-branch-strategy.md) | ⬜ Pending | Neon dev/prod branches, DIRECT_URL, env vars |
| 5 | [stage-5-production-config.md](stage-5-production-config.md) | ⬜ Pending | Vercel build step, migrate deploy |

## Notes

- Always use `prisma migrate dev` — never `db push`
- Prisma 7: connection URL lives in `prisma.config.ts`, not `schema.prisma`
- Dev branch = `DATABASE_URL`, prod branch = separate Neon branch

# Auth — Feature Index

NextAuth v5 with email/password signup, login, and session management.

Spec references: `@context/project-overview.md` (Auth section)

## Stages

| Stage | File | Status | Description |
|---|---|---|---|
| 1 | [stage-1-install-config.md](stage-1-install-config.md) | ⬜ Pending | Install NextAuth v5, configure auth.ts, add env vars |
| 2 | [stage-2-prisma-adapter.md](stage-2-prisma-adapter.md) | ⬜ Pending | Wire Prisma adapter, connect to existing schema |
| 3 | [stage-3-signup.md](stage-3-signup.md) | ⬜ Pending | Signup page + server action (email/password, bcrypt) |
| 4 | [stage-4-login.md](stage-4-login.md) | ⬜ Pending | Login page + Credentials provider |
| 5 | [stage-5-session-protection.md](stage-5-session-protection.md) | ⬜ Pending | Middleware route protection, session in layout |

## Notes

- NextAuth v5 is a major rewrite — config is in `auth.ts` at root, not `pages/api/auth/[...nextauth]`
- Credentials provider requires manual password hashing (bcrypt)
- Prisma adapter models already in schema (`Account`, `Session`, `VerificationToken`)
- `AUTH_SECRET` must be set in `.env` (local) and Vercel env vars (production)

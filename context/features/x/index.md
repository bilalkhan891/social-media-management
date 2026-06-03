# X (Twitter) — Feature Index

Connect user X/Twitter accounts via OAuth so the app can publish posts on their behalf.

Spec references: `@context/project-overview.md` (Social Media Account Linking section)

## Stages

| Stage | File | Status | Description |
|---|---|---|---|
| 1 | [stage-1-developer-app-setup.md](stage-1-developer-app-setup.md) | ⬜ Pending | Register X Developer app, get credentials, add env vars |
| 2 | [stage-2-oauth-flow.md](stage-2-oauth-flow.md) | ⬜ Pending | OAuth 2.0 PKCE redirect + callback routes, save tokens to DB |
| 3 | [stage-3-accounts-page.md](stage-3-accounts-page.md) | ⬜ Pending | Show real connected account on `/accounts`, disconnect button |

## Notes

- X uses OAuth 2.0 with PKCE — no client secret needed for the auth code exchange, but `CLIENT_SECRET` is still required for confidential apps
- Required scopes: `tweet.read`, `tweet.write`, `users.read`, `offline.access` (for refresh tokens)
- Access tokens expire in 2 hours — `offline.access` scope grants a refresh token
- `SocialAccount` model already exists in Prisma schema — no new model needed
- Store `platform = "x"` in the `SocialAccount.platform` field
- Free tier of X API (v2) allows posting — no paid plan required for basic tweet creation

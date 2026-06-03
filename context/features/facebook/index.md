# Facebook — Feature Index

Connect user Facebook accounts via OAuth so the app can publish posts on their behalf.

Spec references: `@context/project-overview.md` (Social Media Account Linking section)

## Stages

| Stage | File | Status | Description |
|---|---|---|---|
| 1 | [stage-1-meta-app-setup.md](stage-1-meta-app-setup.md) | ✅ Complete | Register Meta app, get credentials, add env vars |
| 2 | [stage-2-oauth-flow.md](stage-2-oauth-flow.md) | ✅ Complete | OAuth redirect + callback routes, save tokens to DB |
| 3 | [stage-3-accounts-page.md](stage-3-accounts-page.md) | ✅ Complete | Show real connected account on `/accounts`, disconnect button |

## Notes

- Facebook uses OAuth 2.0 — requires `APP_ID` + `APP_SECRET` from Meta for Developers
- Permissions needed: `pages_manage_posts`, `pages_read_engagement` (for posting to Pages)
- Access tokens expire — may need refresh token handling (long-lived tokens via token exchange)
- `SocialAccount` model already exists in Prisma schema — no new model needed
- Store `platform = "facebook"` in the `SocialAccount.platform` field

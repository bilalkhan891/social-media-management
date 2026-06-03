# Stage 1 — Meta App Setup ⬜

Register a Meta (Facebook) app, obtain credentials, and add required env vars.

## Status: Pending

---

## Create a Meta App

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Click **My Apps → Create App**
3. Choose **Other** → **Business** type
4. Give the app a name (e.g. `Social Media Manager`)
5. Under **Add Products**, add **Facebook Login**
6. In Facebook Login → Settings, add the OAuth redirect URI:
   - Local: `http://localhost:3000/api/auth/facebook/callback`
   - Production: `https://yourdomain.com/api/auth/facebook/callback`

---

## Credentials

From **App Dashboard → Settings → Basic**:

```
App ID     → FACEBOOK_APP_ID
App Secret → FACEBOOK_APP_SECRET
```

---

## Env Vars

Add to `.env`:

```env
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
```

Add same vars to Vercel env vars for production.

---

## Permissions Required

Request these permissions in Facebook Login → Permissions:

| Permission | Purpose |
|---|---|
| `pages_manage_posts` | Publish posts to a Facebook Page |
| `pages_read_engagement` | Read likes, comments, reach |
| `pages_show_list` | List pages the user manages |
| `public_profile` | Basic user info (name, avatar) |

---

## Notes

- App starts in **Development mode** — only the app owner/admins can log in during dev
- Switch to **Live mode** before shipping to real users (requires Meta App Review for `pages_manage_posts`)
- Keep `App Secret` out of client-side code — only used server-side in callback route

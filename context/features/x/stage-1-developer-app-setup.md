# Stage 1 — X Developer App Setup ⬜

Register an X (Twitter) Developer app, obtain credentials, and add required env vars.

## Status: Pending

---

## Create an X Developer App

1. Go to [X Developer Portal](https://developer.x.com/)
2. Sign in and go to **Dashboard → Projects & Apps → New Project**
3. Name the project (e.g. `Social Media Manager`) and create an App inside it
4. Under **App Settings → User authentication settings**, click **Set up**:
   - Enable **OAuth 2.0**
   - App type: **Web App, Automated App or Bot**
   - Callback URI: `http://localhost:3000/api/auth/x/callback`
   - Website URL: `http://localhost:3000` (or your production domain)
5. Save — X will display your `Client ID` and `Client Secret` once

---

## Credentials

From **App Settings → Keys and Tokens**:

```
Client ID     → X_CLIENT_ID
Client Secret → X_CLIENT_SECRET
```

---

## Env Vars

Add to `.env`:

```env
X_CLIENT_ID=
X_CLIENT_SECRET=
```

Add same vars to Vercel env vars for production.

---

## Scopes Required

| Scope | Purpose |
|---|---|
| `tweet.read` | Read tweets (needed for analytics later) |
| `tweet.write` | Post tweets on behalf of the user |
| `users.read` | Fetch user profile (username, avatar) |
| `offline.access` | Receive a refresh token (so we can re-auth without user) |

---

## Notes

- X free tier (v2 API) supports posting up to 1,500 tweets/month — sufficient for MVP
- The `Client Secret` is only used server-side — never expose it in client code
- X Developer account approval is usually instant for new apps with standard use cases
- Add `http://localhost:3000/api/auth/x/callback` as a callback URL — exact match required, no trailing slash

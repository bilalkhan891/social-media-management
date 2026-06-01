# Stage 6 — Connected Accounts Page

Route: `/accounts`

---

## Page Header

- Title: "Connected Accounts"
- Subtitle: "Manage your social media accounts and integrations"
- "+ Connect Account" button (top-right, outlined)

---

## Connected Accounts List

- Section label: "Connected Accounts (3)" — count is dynamic
- Each account row (ShadCN `Card`):
  - Platform icon + platform name + "✓ Connected" badge (green)
  - Username/handle below the platform name
  - Left: "Followers: [number]"
  - Right: "Connected Since: [date]"
  - Far right: "Settings" button (ghost) + "Disconnect" button (outlined/destructive)

| Platform | Handle | Followers | Connected Since |
|---|---|---|---|
| Twitter | @brandname | 24,580 | November 15, 2024 |
| Instagram | brandname | 12,340 | November 10, 2024 |
| LinkedIn | Brand Name | 8,920 | December 1, 2024 |

- Data source: `mockSocialAccounts` filtered to `connected === true` from `src/lib/mock-data.ts`

---

## Account Limits Section

- Section title: "Account Limits"
- Two labeled progress bars (ShadCN `Progress`):
  - "Connected Accounts" — 3 / 10 — bar filled ~30%
  - "Scheduled Posts (This Month)" — 12 / 50 — bar filled ~24%
- Data source: `mockAccountLimits` from `src/lib/mock-data.ts`

---

## Upgrade Banner

- Full-width panel at the bottom of the page
- Text: "Pro Plan: Upgrade to unlock unlimited accounts and scheduled posts"
- Subtle background color to distinguish from the rest of the page

---

## Files to Create

- `src/app/accounts/page.tsx`
- `src/components/accounts/AccountCard.tsx`
- `src/components/accounts/AccountLimits.tsx`

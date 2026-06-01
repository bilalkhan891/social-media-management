# Stage 7 — Settings Page

Route: `/settings`

---

## Page Header

- Title: "Settings"

---

## Settings Cards (stacked, full width)

Each item is a ShadCN `Card` with a title and description. No forms yet — these are placeholders for future expansion.

| # | Title | Description |
|---|---|---|
| 1 | Account Settings | "Manage your profile and preferences" |
| 2 | Notifications | "Control your notification preferences" |
| 3 | Dark Mode | "Currently enabled" |

- Cards are stacked vertically with spacing between them
- Each card is clickable (navigates to a sub-settings page in a future iteration)
- Dark Mode card reflects the current state ("Currently enabled" since dark is default)

---

## Files to Create

- `src/app/settings/page.tsx`
- `src/components/settings/SettingsCard.tsx`

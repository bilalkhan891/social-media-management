# Stage 1 — Setup

ShadCN UI initialization, dark mode configuration, and component installation.

---

## ShadCN UI Initialization

```bash
npx shadcn@latest init
```

During init, select:
- Style: **Default**
- Base color: **Neutral**
- CSS variables: **Yes**

This generates `components.json` and adds base CSS variables to `app/globals.css`.

---

## Dark Mode by Default

The app is dark mode first. Configure in two places:

**`app/layout.tsx`** — add `dark` class to `<html>`:
```tsx
<html lang="en" className="dark">
```

**`app/globals.css`** — do not use `prefers-color-scheme` media query. Hardcode dark as the default via the `.dark` class selector that ShadCN generates.

---

## ShadCN Components to Install

```bash
npx shadcn@latest add button card badge avatar progress separator checkbox input textarea tabs calendar popover tooltip sheet
```

| Component | Used On |
|---|---|
| `button` | All pages — primary, secondary, ghost variants |
| `card` | Dashboard stats, post cards, settings panels |
| `badge` | Platform tags, post status (Published, Scheduled, Draft) |
| `avatar` | User profile in sidebar and header |
| `progress` | Account limits bars on Accounts page |
| `separator` | Section dividers |
| `checkbox` | Platform selector on Create Post page |
| `input` | Date/time fields on Create Post, Settings |
| `textarea` | Post content editor on Create Post page |
| `tabs` | Filter tabs on Scheduled Posts page |
| `calendar` | Calendar view on Scheduled Posts page |
| `popover` | Date picker wrapper for schedule inputs |
| `tooltip` | Icon button labels throughout |
| `sheet` | Mobile sidebar drawer |

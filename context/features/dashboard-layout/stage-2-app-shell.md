# Stage 2 — App Shell

Root layout, sidebar, and top header. Shared across all pages.

---

## Root Layout (`app/layout.tsx`)

- Wraps all pages in a flex row: sidebar + main content area
- `<html>` has `className="dark"` for dark mode by default
- Main content area takes remaining width and is scrollable

---

## Sidebar (left, collapsible)

- Fixed width (~180px expanded, icon-only when collapsed)
- Dark background, slightly lighter than page background
- **Top section:**
  - Hamburger/collapse toggle icon (left)
  - App title: "Social Media Manager" (hidden when collapsed, shows "Manager" at small width)
- **Nav links** (with icons, stacked vertically):
  - Dashboard
  - Create Post
  - Scheduled
  - Accounts
  - Settings
  - Active link: highlighted background, white text
  - Inactive links: muted text, no background
- **Bottom section (pinned):**
  - User avatar circle (initials, e.g. "JD")
  - Name: "John Doe"
  - Plan label: "Pro Plan" (muted, smaller text)

---

## Top Header (right of sidebar)

- Spans full width of the main content area
- Left: app title "Social Media Manager"
- Right:
  - "Connect Account" button (outlined variant)
  - User avatar circle with initials

---

## Files to Create

- `src/components/layout/Sidebar.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/AppShell.tsx` — wraps Sidebar + Header + `{children}`

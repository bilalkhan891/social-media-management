# Stage 5 — Scheduled Posts Page

Route: `/scheduled`

---

## Page Header

- Title: "Scheduled Posts"
- Subtitle: "Manage and view all your upcoming posts"

---

## Filter Tabs

- Uses ShadCN `Tabs` component
- Tab options: **All Posts** | **This Week** | **Twitter** | **Instagram**
- Active tab is underlined/highlighted
- Filtering is client-side against `mockPosts` from `src/lib/mock-data.ts`

---

## Post Cards Grid

- Layout: 2–3 column responsive grid
- Each card (ShadCN `Card`):
  - **Thumbnail area** — image preview or colored placeholder block
  - **Content** — post text (truncated to 2 lines)
  - **Platform badges** — one badge per platform target (e.g. "Twitter", "Instagram")
  - **Status badge** — "Scheduled" (blue) or "Published" (green)
  - **Date/time** — e.g. "Oct 21 at 10:00 AM"
  - **Action buttons** — Edit | Reschedule | Delete (shown inline on card)

Example posts:
1. "Exciting new feature announcement" — Twitter — Scheduled — Oct 21 at 10:00 AM
2. "Weekly newsletter roundup" — Twitter + Instagram + LinkedIn — Scheduled — Oct 25 at 2:00 PM
3. "Holiday special promotion" — Twitter + Instagram — Scheduled — Dec 20 at 12:00 PM

---

## Right Sidebar Preview Panel

- Appears alongside the grid (right column)
- Shows a compact detail card for a selected/highlighted post
- Displays: content snippet, platform badge, Edit / Reschedule / Delete buttons

---

## Calendar View (below grid)

- Title: "Calendar View"
- Full monthly calendar using ShadCN `Calendar` component
- Days with scheduled posts have a colored dot/indicator
- Clicking a day shows posts scheduled on that date
- Data source: `mockPosts` filtered to `status === "scheduled"` from `src/lib/mock-data.ts`

---

## Files to Create

- `src/app/scheduled/page.tsx`
- `src/components/scheduled/PostCard.tsx`
- `src/components/scheduled/PostsGrid.tsx`
- `src/components/scheduled/CalendarView.tsx`

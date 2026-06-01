# Stage 3 — Dashboard Page

Route: `/dashboard`

---

## Page Header

- Title: "Dashboard"
- Subtitle: "Welcome back! Here's your social media overview"

---

## Stats Row (4 cards, equal width)

Each card: label (top), large number (middle), secondary line (bottom).

| # | Label | Value | Secondary |
|---|---|---|---|
| 1 | Total Followers | 24,580 | +12.5% (green, trend up) |
| 2 | Post Engagement | 8,240 | +5.2% (green, trend up) |
| 3 | Scheduled Posts | 12 | "This Month" (no trend) |
| 4 | Avg. Reach | 3,420 | +8.1% (green, trend up) |

- Each card has a small platform-colored icon in the top-right corner
- Trend percentage is green for positive values
- Uses ShadCN `Card` component

---

## Engagement Over Time (left panel, ~65% width)

- Title: "Engagement Over Time"
- Subtitle: "Last 30 days"
- Bar chart: x-axis = dates (1 Dec → 30 Dec), y-axis = engagement count
- Bars are blue/indigo
- Below chart, three summary stats in a row:
  - Likes: **2,840**
  - Comments: **456**
  - Shares: **324**
- Data source: `mockEngagementChart` from `src/lib/mock-data.ts`

---

## Top Posts (right panel, ~35% width)

- Title: "Top Posts"
- List of platforms with engagement score (right-aligned number):
  - Twitter — 1240
  - Instagram — 892
  - LinkedIn — 567
- Each row: platform icon + platform name + score
- Data source: `mockTopPostsByPlatform` from `src/lib/mock-data.ts`

---

## Recent Posts (full-width panel, below chart row)

- Title: "Recent Posts"
- List of post rows, each showing:
  - Post content text (truncated to one line)
  - Time ago label (e.g. "2 hours ago")
  - Platform badge (e.g. "Twitter")
  - Status badge: "Published" (green) | "Scheduled" (blue) | "Draft" (gray)
- Show published and scheduled posts, most recent first
- Data source: `mockPosts` filtered by status from `src/lib/mock-data.ts`

---

## Files to Create

- `src/app/dashboard/page.tsx`
- `src/components/dashboard/StatsCard.tsx`
- `src/components/dashboard/EngagementChart.tsx`
- `src/components/dashboard/TopPostsPanel.tsx`
- `src/components/dashboard/RecentPostsList.tsx`

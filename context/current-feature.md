# Current Feature

Dashboard Layout — Stage 5: Scheduled Posts Page

## Status

Implemented — awaiting browser test & commit

## Goals

- [x] Filter tabs: All Posts | This Week | Twitter | Instagram
- [x] Post cards grid (2-col on sm, with 3rd col sidebar on lg)
- [x] Right sidebar preview panel for selected post
- [x] Calendar view with dot indicators for scheduled days
- [x] Clicking a calendar day shows posts for that day

## Notes

- Components in `components/scheduled/`
- Page (`app/scheduled/page.tsx`) is a client component — manages `activeTab` state, filters `mockPosts`
- `PostCard` exports `MockPost` type reused by `PostsGrid`
- `CalendarView` uses custom `DayButton` override to render dot indicators
- Current branch: `feature/dashboard-layout-stage-5-scheduled-posts`
- Full spec in @context/features/dashboard-layout/stage-5-scheduled-posts.md

## Next Steps

After testing and committing stage 5:
- Merge `feature/dashboard-layout-stage-5-scheduled-posts` → main, delete branch
- Move to Stage 6: Connected Accounts page (`/accounts`)
- Then Stage 7: Settings page

## History

- Stage 1 (Setup) completed — ShadCN initialized, dark mode configured, 14 components installed, build passing
- Stage 2 (App Shell) completed — Sidebar, Header, AppShell built, mock-data moved to lib/, build passing
- Stage 3 (Dashboard Page) completed — stats cards, engagement chart, top posts panel, recent posts list, build passing
- Stage 4 (Create Post Page) completed — editor, media upload, platform selector, scheduler, build passing, merged to main
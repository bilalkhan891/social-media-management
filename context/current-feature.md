# Current Feature

Dashboard Layout — Stage 4: Create Post Page

## Status

Implemented — awaiting browser test & commit

## Goals

- [x] Post content editor with character counter and per-platform limits
- [x] Media upload drag-and-drop zone
- [x] Platform selector with connected/disconnected states
- [x] Schedule date/time picker
- [x] Action buttons: Schedule Post, Publish Now, Save Draft

## Notes

- Components in `components/create-post/`
- Page (`app/create/page.tsx`) is a client component — manages shared `content` and `selectedPlatforms` state
- Build passes, not yet committed
- Current branch: `feature/dashboard-layout-stage-4-create-post`
- Full spec in @context/features/dashboard-layout/stage-4-create-post.md

## Next Steps

After testing and committing stage 4:
- Merge `feature/dashboard-layout-stage-4-create-post` → main, delete branch
- Move to Stage 5: Scheduled Posts page (`/scheduled`) — post cards grid, filter tabs, calendar view
- Then Stage 6: Connected Accounts page
- Then Stage 7: Settings page

## History

- Stage 1 (Setup) completed — ShadCN initialized, dark mode configured, 14 components installed, build passing
- Stage 2 (App Shell) completed — Sidebar, Header, AppShell built, mock-data moved to lib/, build passing
- Stage 3 (Dashboard Page) completed — stats cards, engagement chart, top posts panel, recent posts list, build passing
- Stage 4 (Create Post Page) implemented — build passes, pending browser test and commit

## History

- Stage 1 (Setup) completed — ShadCN initialized, dark mode configured, 14 components installed, build passing
- Stage 2 (App Shell) completed — Sidebar, Header, AppShell built, mock-data moved to lib/, build passing
- Stage 3 (Dashboard Page) completed — stats cards, engagement chart, top posts panel, recent posts list, build passing
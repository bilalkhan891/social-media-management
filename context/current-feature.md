# Current Feature

Dashboard Layout — Stage 6: Connected Accounts Page

## Status

Implemented — awaiting browser test & commit

## Goals

- [x] Page header with "+ Connect Account" button
- [x] Connected accounts list with platform icon, badge, username, followers, connected-since date
- [x] Settings + Disconnect action buttons per account
- [x] Account Limits section with two progress bars
- [x] Upgrade banner (Pro Plan)

## Notes

- Components in `components/accounts/`
- Page (`app/accounts/page.tsx`) is a server component — filters `mockSocialAccounts` to `connected === true`
- `AccountLimits` uses `mockAccountLimits` for progress bar values
- Current branch: `feature/dashboard-layout-stage-6-accounts`
- Full spec in @context/features/dashboard-layout/stage-6-accounts.md

## Next Steps

After testing and committing stage 6:
- Merge `feature/dashboard-layout-stage-6-accounts` → main, delete branch
- Move to Stage 7: Settings page (`/settings`)

## History

- Stage 1 (Setup) completed — ShadCN initialized, dark mode configured, 14 components installed, build passing
- Stage 2 (App Shell) completed — Sidebar, Header, AppShell built, mock-data moved to lib/, build passing
- Stage 3 (Dashboard Page) completed — stats cards, engagement chart, top posts panel, recent posts list, build passing
- Stage 4 (Create Post Page) completed — editor, media upload, platform selector, scheduler, build passing, merged to main
- Stage 5 (Scheduled Posts Page) completed — filter tabs, post grid, calendar with dot indicators, build passing, merged to main
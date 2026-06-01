# Current Feature

Dashboard Layout — Stage 2: App Shell

## Status

Completed

## Goals

- Build the root layout wrapper (AppShell)
- Build collapsible Sidebar with nav links and user info
- Build top Header with title, Connect Account button, and avatar

## Notes

- Components go in `components/layout/` (not `src/components/layout/`)
- `@/` maps to project root per tsconfig
- Sidebar uses `usePathname` for active link detection
- Full spec in @context/features/dashboard-layout/stage-2-app-shell.md

## History

- Stage 1 (Setup) completed — ShadCN initialized, dark mode configured, 14 components installed, build passing
- Stage 2 (App Shell) completed — Sidebar, Header, AppShell built, mock-data moved to lib/, build passing
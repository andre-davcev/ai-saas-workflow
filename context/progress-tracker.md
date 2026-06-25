# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Editor chrome: base navbar and sidebar shell

## Current Goal

- Implement the next feature unit in `context/feature-specs/`.

## Completed

- Design system / UI primitive components (`context/feature-specs/01-design-system.md`): Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea already present in `libs/shadcn/src`; `lucide-react` installed; applied `dark` class to `<html>` in `apps/ghost-ai/src/app/layout.tsx` so the existing dark theme in `global.css` is active by default (verified via dev server response, no default light styling).
- Editor chrome (`context/feature-specs/02-editor.md`): generated the `ghost-ai-components` React lib (`libs/ghost-ai-components`, non-buildable, no test runner, matching the `shadcn`/`shadcn-util` lib pattern). Added `editor/editor-navbar.tsx` (fixed-height top bar, left/center/right sections, `PanelLeftOpen`/`PanelLeftClose` toggle, dark `bg-background` with `border-b`), `editor/project-sidebar.tsx` (absolutely-positioned floating panel that slides in/out via `translate-x`, `Projects` header with close button, shadcn `Tabs` for My Projects/Shared with empty placeholder states, full-width `New Project` button with `Plus` icon), and `dialog/dialog-pattern.tsx` (an `AppDialog` wrapper around the shadcn Dialog primitives supporting `title`/`description`/`footer`/`children` props, styled with existing `bg-background`/`border-border` tokens plus the `rounded-3xl` modal radius convention — no concrete dialog instantiated yet, per spec). All exported from `libs/ghost-ai-components/src/index.ts`. Verified by temporarily rendering `EditorNavbar` + `ProjectSidebar` on the app homepage, running the Next dev server, and screenshotting via Playwright (sidebar slide, icon swap, tab content, no console errors) — that temporary wiring was reverted afterward since the spec doesn't yet call for an editor route. `tsc -p libs/ghost-ai-components/tsconfig.lib.json --noEmit` and `nx run @org/ghost-ai-components:lint` both pass clean.

## In Progress

- None yet.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- `ui-context.md` documents a bespoke color token palette (`--bg-base`, `--accent-primary`, `text-copy-primary`, etc.) that does not exist anywhere in the codebase — `libs/shadcn-util/src/global.css` and both `tailwind.config.js` files only define the standard shadcn/ui tokens (`background`, `border`, `muted`, `popover`, etc.). `02-editor.md` explicitly says to use "the existing color tokens from `globals.css`," so new components in this unit use the standard shadcn tokens that actually exist. `ui-context.md` should be reconciled with the real token set (either implement the custom palette or update the doc to match shadcn defaults) before further UI work leans on it.

## Architecture Decisions

- `ghost-ai-components` was generated with `nx g @nx/react:library --bundler=none --unitTestRunner=none --component=false --importPath=@org/ghost-ai-components --useProjectJson=true`, matching the non-buildable, test-less setup of the existing `shadcn`/`shadcn-util` libs. Unlike those two, the generator produced a `package.json` for it (current `@nx/react` default); kept it since the root `package.json` already declares npm workspaces (`apps/*`, `libs/*`, `api`), so it resolves correctly via the workspace symlink in `node_modules/@org` without needing a manual `tsconfig.base.json` path entry.

## Session Notes

- After generating a new lib (or otherwise changing project dependency edges), run `npx nx reset` before relying on `nx run-many`/Tailwind's `createGlobPatternsForDependencies` — the cached project graph the dev server's Tailwind config reads (`readCachedProjectGraph()`) does not pick up brand-new dependency edges otherwise, so the new lib's classes silently don't make it into the Tailwind content scan even after restarting `next dev` and clearing `.next`. Cost real time to diagnose; not a Turbopack bug, just a stale-graph gotcha.
- The workspace-wide `shadcn-util:build` / `shadcn:build` nx targets currently fail (`error TS5072: Unknown build option '--useLegacyTypescriptPlugin=true'`) due to `nx.json`'s `targetDefaults.build.options.useLegacyTypescriptPlugin: true` being incompatible with the installed TypeScript version. Worked around it by building those libs directly with `npx tsc --build <tsconfig.lib.json> --force` instead of going through the nx target. Pre-existing, unrelated to this unit's work — not fixed.
- `nx run ghost-ai:lint` also currently fails standalone (`ESLint: "overrides" key... not supported in flat config`) — pre-existing in the app's own eslint config, unrelated to this unit's work.

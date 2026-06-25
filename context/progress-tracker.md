# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Editor chrome: base navbar and sidebar shell

## Current Goal

- Implement the next feature unit in `context/feature-specs/`.

## Completed

- Design system / UI primitive components (`context/feature-specs/01-design-system.md`): Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea already present in `libs/shadcn/src`; `lucide-react` installed; applied `dark` class to `<html>` in `apps/ghost-ai/src/app/layout.tsx` so the existing dark theme in `global.css` is active by default (verified via dev server response, no default light styling).
- Editor chrome (`context/feature-specs/02-editor.md`): generated the `ghost-ai-components` React lib (`libs/ghost-ai-components`, non-buildable, no test runner, matching the `shadcn`/`shadcn-util` lib pattern). Added `editor/editor-navbar.tsx` (fixed-height top bar, left/center/right sections, `PanelLeftOpen`/`PanelLeftClose` toggle, dark `bg-background` with `border-b`), `editor/project-sidebar.tsx` (absolutely-positioned floating panel that slides in/out via `translate-x`, `Projects` header with close button, shadcn `Tabs` for My Projects/Shared with empty placeholder states, full-width `New Project` button with `Plus` icon), and `dialog/dialog-pattern.tsx` (an `AppDialog` wrapper around the shadcn Dialog primitives supporting `title`/`description`/`footer`/`children` props, styled with existing `bg-background`/`border-border` tokens plus the `rounded-3xl` modal radius convention — no concrete dialog instantiated yet, per spec). All exported from `libs/ghost-ai-components/src/index.ts`. Verified by temporarily rendering `EditorNavbar` + `ProjectSidebar` on the app homepage, running the Next dev server, and screenshotting via Playwright (sidebar slide, icon swap, tab content, no console errors) — that temporary wiring was reverted afterward since the spec doesn't yet call for an editor route. `tsc -p libs/ghost-ai-components/tsconfig.lib.json --noEmit` and `nx run @org/ghost-ai-components:lint` both pass clean.
- Added the `shadcn` npm package (`shadcn@^4.11.0`, the standalone CLI) as a root devDependency.
- Fixed a build-breaking bug in `apps/ghost-ai/src/app/global.css`: it had been hand-edited with Tailwind v4-only syntax (`@import "tailwindcss"`, `@theme inline`, `@custom-variant dark`) pasted on top of this repo's actual Tailwind v3 pipeline (plain `tailwindcss`/`autoprefixer` PostCSS plugins, `tailwind.config.js`), which threw `CssSyntaxError: @layer base is used but no matching @tailwind base directive` and made every page 500. Rewrote it as plain v3-valid CSS: shadcn's HSL-triplet tokens (`--background`, `--border`, etc.) restated as real HSL triplets (the hand-edit had set them to raw hex, which is invalid input to `tailwind.config.js`'s `hsl(var(--x))` wrapper) in a plain `:root` block, plus the bespoke palette from `context/ui-context.md` (`--bg-base`, `--text-primary`, `--accent-ai`, etc.) kept as plain hex/rgba custom properties. Wired that bespoke palette into `libs/shadcn-util/tailwind.config.js`'s `theme.extend.colors` under collision-free aliases (e.g. `--text-primary` → key `copy-primary` → utility `text-copy-primary`, since bare `primary` is already the shadcn accent color) — this finally resolves the `Open Questions` entry below about the palette not existing anywhere. Updated `dialog/dialog-pattern.tsx` to use the new tokens (`border-surface-border bg-elevated text-copy-primary` instead of the shadcn-token stand-in) and added `backdrop-blur-sm` to the shared `DialogOverlay` in `libs/shadcn/src/dialog.tsx` to match `ui-context.md`'s "dark background with backdrop blur" modal spec. Verified via `tsc`/lint clean on `ghost-ai-components`, and via a fresh dev server + Playwright check that `body` now computes to `background-color: rgb(8,8,9)` / `color: rgb(240,240,244)` (matching `--bg-base`/`--text-primary`) with no console errors.

## In Progress

- None yet.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- `ui-context.md`'s Typography section calls for Geist Sans/Mono loaded via `next/font/google` and applied as CSS variables on `<html>` (`--font-geist-sans`, `--font-geist-mono`). That's not wired up yet — `apps/ghost-ai/src/app/layout.tsx` doesn't load any fonts, so `html { @apply font-sans; }` in `global.css` currently falls back to Tailwind's default sans stack, not Geist. Needs its own pass when typography work comes up.
- `ui-context.md` only gives 7 example bespoke-palette utility names (`bg-base`, `bg-surface`, `text-copy-primary`, `text-copy-muted`, `border-surface-border`, `text-brand`, `bg-accent-dim`); the remaining ~10 tokens (`bg-elevated`, `bg-subtle`, `border-subtle`, `text-secondary`, `text-faint`, `accent-ai`, `accent-ai-text`, the three `state-*` tokens) got collision-free aliases invented to fit the same pattern when wiring them into `libs/shadcn-util/tailwind.config.js` (see Completed). Worth double-checking those invented names (`elevated`, `subtle`, `subtle-border`, `copy-secondary`, `copy-faint`, `brand-ai`, `ai-text`, `error`/`success`/`warning`) against any future design-system source of truth, in case the intended names differ.

## Architecture Decisions

- `ghost-ai-components` was generated with `nx g @nx/react:library --bundler=none --unitTestRunner=none --component=false --importPath=@org/ghost-ai-components --useProjectJson=true`, matching the non-buildable, test-less setup of the existing `shadcn`/`shadcn-util` libs. Unlike those two, the generator produced a `package.json` for it (current `@nx/react` default); kept it since the root `package.json` already declares npm workspaces (`apps/*`, `libs/*`, `api`), so it resolves correctly via the workspace symlink in `node_modules/@org` without needing a manual `tsconfig.base.json` path entry.

## Session Notes

- After generating a new lib (or otherwise changing project dependency edges), run `npx nx reset` before relying on `nx run-many`/Tailwind's `createGlobPatternsForDependencies` — the cached project graph the dev server's Tailwind config reads (`readCachedProjectGraph()`) does not pick up brand-new dependency edges otherwise, so the new lib's classes silently don't make it into the Tailwind content scan even after restarting `next dev` and clearing `.next`. Cost real time to diagnose; not a Turbopack bug, just a stale-graph gotcha.
- The workspace-wide `shadcn-util:build` / `shadcn:build` nx targets currently fail (`error TS5072: Unknown build option '--useLegacyTypescriptPlugin=true'`) due to `nx.json`'s `targetDefaults.build.options.useLegacyTypescriptPlugin: true` being incompatible with the installed TypeScript version. Worked around it by building those libs directly with `npx tsc --build <tsconfig.lib.json> --force` instead of going through the nx target. Pre-existing, unrelated to this unit's work — not fixed.
- `nx run ghost-ai:lint` also currently fails standalone (`ESLint: "overrides" key... not supported in flat config`) — pre-existing in the app's own eslint config, unrelated to this unit's work.
- Under this app's Next.js/Turbopack + Tailwind v3 PostCSS setup, `tailwindcss`'s `normalizeTailwindDirectives` check runs per-file, not on the post-`@import` merged result: a CSS file using `@layer base { ... }` throws `@layer base is used but no matching @tailwind base directive` even if a file it `@import`s already has `@tailwind base`. `apps/ghost-ai/src/app/global.css` only `@import`s `libs/shadcn-util/src/global.css` (which has the `@tailwind` directives) and doesn't declare its own, so anything added there needs to avoid `@layer` — bare `@apply`/plain rules work fine outside a `@layer` block.

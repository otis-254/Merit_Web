# Merit Admin Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the Merit Admin dashboard the public website’s light/dark visual system, smooth AOS reveals, polished interaction motion, and adaptive cursor spotlight while preserving operational readability.

**Architecture:** Reuse the public-site theme model through a local admin `ThemeProvider` and toggle, but define dashboard-specific semantic CSS tokens for light and dark data surfaces. A client-side motion initializer owns AOS lifecycle; all route content uses reusable reveal classes rather than page-specific animation scripts. The spotlight is a decorative client component that adapts its radial colour to the active theme and is disabled for touch/reduced-motion users.

**Tech Stack:** Next.js 15, React 18, TypeScript, next-themes, AOS, Lucide React, Tailwind CSS, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-20-merit-admin-cms-design.md`

## Global Constraints

- Retain the approved dark-navy, orange, and warm-neutral Merit palette; do not copy the public marketing layout into dense operational views.
- Support full workspace light, dark, and system theme selection with a smooth, reduced-motion-safe transition.
- Use AOS only for section-level entrance motion and ensure content remains visible before JavaScript runs.
- Keep cursor spotlight decorative, pointer-device-only, and disabled under `prefers-reduced-motion`.
- Preserve readable table, form, status, and focus contrast in both modes.
- Do not expose Supabase values or change any persistence behavior as part of this visual task.

## Review Focus

- First paint without JavaScript: dashboard content remains visible without AOS classes hiding it; Task 2.
- Reduced-motion users: transitions, AOS, spotlight, and hover transforms become non-decorative; Task 2.
- System theme hydration: the initial theme does not flash an incorrect background; Task 1.
- Dark-mode data density: tables/status labels remain legible without relying on colour alone; Task 3.
- Mobile controls: theme toggle and navigation trigger stay reachable without overlapping; Task 1.

### Task 1: Establish the admin theme system

**Files:**
- Create: `merit-admin/src/components/theme/{theme-provider,theme-toggle}.tsx`
- Modify: `merit-admin/src/app/layout.tsx`
- Modify: `merit-admin/src/components/layout/admin-topbar.tsx`
- Modify: `merit-admin/src/app/globals.css`
- Modify: `merit-admin/package.json`, `package-lock.json`
- Test: `merit-admin/tests/theme.spec.ts`

**Interfaces:**
- Produces: `AdminThemeProvider`, `AdminThemeToggle`, and root `.dark` semantic variables consumed by every dashboard surface.

- [ ] Write a failing browser test that clicks “Switch to dark mode”, confirms `.dark` on `<html>`, and verifies the top bar/control remains visible on a 390px viewport.
- [ ] Run `env PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm --prefix merit-admin run test:ui -- tests/theme.spec.ts --workers=1` and observe the missing control failure.
- [ ] Add `next-themes`, implement the provider/toggle, apply it around the admin shell, and introduce semantic light/dark variables for canvas, panels, text, borders, input surfaces, orange actions, and status states.
- [ ] Rerun the focused test and the existing shell suite; both pass.
- [ ] Commit inside `merit-admin`: `feat: add admin light and dark themes`.

### Task 2: Add AOS and adaptive spotlight motion

**Files:**
- Create: `merit-admin/src/components/motion/{aos-provider,cursor-spotlight}.tsx`
- Modify: `merit-admin/src/app/layout.tsx`
- Modify: `merit-admin/src/app/globals.css`
- Modify: `merit-admin/package.json`, `package-lock.json`
- Test: `merit-admin/tests/motion.spec.ts`

**Interfaces:**
- Produces: `AdminAosProvider({ children })`, `AdminCursorSpotlight()`, and the `data-aos`/`data-reveal` conventions used by dashboard modules.

- [ ] Write failing tests that verify the spotlight exists only for fine pointers and that reduced-motion has no AOS transform/opacity transition.
- [ ] Run the focused test and observe missing motion components/styles.
- [ ] Add AOS initialization with `once: true`, short distance/duration, and disabled reduced-motion behavior; add a pointer-safe spotlight with theme-aware orange/blue radial energy; add CSS fallbacks that never hide content before AOS initializes.
- [ ] Rerun the focused test and full admin UI suite; both pass.
- [ ] Commit inside `merit-admin`: `feat: add dashboard motion system`.

### Task 3: Apply operational visual tokens and interaction polish

**Files:**
- Modify: `merit-admin/src/app/globals.css`
- Modify: `merit-admin/src/components/layout/{admin-sidebar,admin-topbar}.tsx`
- Modify: `merit-admin/src/app/{page,leads}/page.tsx`
- Modify: `merit-admin/tests/app-shell.spec.ts`

**Interfaces:**
- Consumes: theme and motion components from Tasks 1–2.
- Produces: tokenised cards, tables, status badges, inputs, action buttons, and page-heading reveal classes ready for the remaining CMS workspace routes.

- [ ] Write a failing visual-behaviour test asserting active navigation, orange primary controls, and content headings carry a `data-aos` reveal marker while their accessible names remain unchanged.
- [ ] Run the focused test and confirm these semantic/visual hooks are absent.
- [ ] Refine the admin shell for the public-site palette: warm panel shadows, orange focus rings, dark-mode navigation and table surfaces, staggered heading/card reveals, and restrained hover elevation. Do not animate data updates or obscure rows behind entrance effects.
- [ ] Run the full admin browser suite and `npm --prefix merit-admin run build`; both pass.
- [ ] Commit inside `merit-admin`: `feat: polish Merit admin experience`.

## Self-review

- Theme, responsive control, AOS, spotlight, dark/light visual tokens, and public-site-aligned interactions each map to a task.
- Theme/motion interfaces are defined before dashboard surfaces consume them.
- Tests cover accessible controls and motion safety, not private CSS implementation details.
- Persistence, Supabase configuration, and public-site source remain untouched.

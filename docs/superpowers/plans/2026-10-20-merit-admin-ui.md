# Merit Admin UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, responsive, standalone UI-only admin CMS prototype for Merit Graphics in its own `merit-admin` Git repository.

**Architecture:** The CMS is a separate Next.js application nested in the workspace but excluded from the public-site Git repository. It renders fixture-driven operational data through small, route-focused components; a single data module creates an explicit boundary for a later Supabase integration. Shared application-shell components provide the approved dark-navy sidebar, white workspace, orange actions, global search affordance, and mobile navigation behavior.

**Tech Stack:** Next.js 15, React 18, TypeScript, Tailwind CSS 3, Lucide React, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-20-merit-admin-cms-design.md`

## Global Constraints

- Create `merit-admin/` as a separately initialised Git repository and exclude it with `/merit-admin/` in the public-site `.gitignore`.
- Keep this delivery UI-only: no Supabase client, authentication, API routes, database migrations, secrets, server mutations, uploads, or live integrations.
- Keep representative fixtures in focused data modules so Supabase can replace the data source later without changing UI contracts.
- Use the approved Merit palette: dark navy navigation, white workspace, orange primary actions, and accessible neutral status colors.
- Retain desktop and mobile usability; the sidebar must be usable at a narrow viewport.
- Respect `prefers-reduced-motion` for decorative transitions.
- Do not import source files across the public-site and admin repositories.

## Review Focus

- Narrow screens: navigation remains reachable, has an accessible label, and closes after route selection; covered in Task 2.
- Data-source replacement: every view receives fixture data from `src/data/admin-fixtures.ts`, rather than hard-coded records spread across JSX; covered in Task 3.
- Operational discoverability: every area defined in the spec is visible from navigation and has an obvious route-level purpose; covered in Task 4.
- State clarity: lead, quote, content, and integration statuses have text labels in addition to color; covered in Task 3.
- Non-functional controls: UI-only buttons do not imply completed server mutations and use clear prototype affordances; covered in Task 4.

### Task 1: Initialise the isolated admin application

**Files:**
- Modify: `.gitignore`
- Create: `merit-admin/.gitignore`
- Create: `merit-admin/package.json`
- Create: `merit-admin/next.config.ts`
- Create: `merit-admin/tsconfig.json`
- Create: `merit-admin/tailwind.config.ts`
- Create: `merit-admin/postcss.config.js`
- Create: `merit-admin/src/app/layout.tsx`
- Create: `merit-admin/src/app/globals.css`
- Create: `merit-admin/src/app/page.tsx`
- Create: `merit-admin/playwright.config.ts`
- Create: `merit-admin/tests/app-shell.spec.ts`
- Create: `merit-admin/README.md`

**Interfaces:**
- Produces: a standalone app at `merit-admin/` that starts with `npm run dev` and is independently managed by its own `.git` directory.

- [ ] **Step 1: Write the failing application-shell test**

```ts
test('renders the Merit Admin workspace', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible()
  await expect(page.getByRole('navigation', { name: 'Admin navigation' })).toBeVisible()
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run test:ui -- --workers=1`

Expected: FAIL because the separate app and its route do not exist.

- [ ] **Step 3: Initialise `merit-admin/.git`, add `/merit-admin/` to the parent `.gitignore`, and create the minimal Next.js application**

Create independent package scripts for `dev`, `build`, `start`, `test:ui`, and `lint`. Use an initial `layout.tsx`, `page.tsx`, and global CSS that render the admin workspace boundary; document local setup and explicitly state that it contains no Supabase connection.

- [ ] **Step 4: Run the shell test to verify it passes**

Run: `PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run test:ui -- --workers=1`

Expected: PASS with the workspace title and labelled navigation visible.

- [ ] **Step 5: Commit the standalone app bootstrap in `merit-admin/`**

```bash
git add .
git commit -m "chore: initialise Merit admin UI"
```

### Task 2: Build the responsive application shell

**Files:**
- Create: `merit-admin/src/components/layout/admin-shell.tsx`
- Create: `merit-admin/src/components/layout/admin-sidebar.tsx`
- Create: `merit-admin/src/components/layout/admin-topbar.tsx`
- Create: `merit-admin/src/components/layout/admin-navigation.ts`
- Modify: `merit-admin/src/app/layout.tsx`
- Modify: `merit-admin/src/app/globals.css`
- Modify: `merit-admin/tests/app-shell.spec.ts`

**Interfaces:**
- Consumes: the Next.js application created in Task 1.
- Produces: `AdminShell({ children }: { children: ReactNode })`, which wraps each route with responsive navigation and the global top bar.

- [ ] **Step 1: Extend the failing Playwright test for mobile navigation**

```ts
test('opens and closes the navigation on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await expect(page.getByRole('link', { name: 'Leads' })).toBeVisible()
  await page.getByRole('link', { name: 'Leads' }).click()
  await expect(page.getByRole('heading', { name: 'Leads' })).toBeVisible()
})
```

- [ ] **Step 2: Run the navigation test to verify it fails**

Run: `PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run test:ui -- --workers=1`

Expected: FAIL because navigation cannot yet open on a mobile viewport.

- [ ] **Step 3: Implement the shell and navigation components**

Create navigation entries for Overview, Leads, Quotes, AI conversations, Content, Media, Team & roles, Integrations, and Audit log. Use a dark navy desktop rail, a focus-managed mobile drawer, a white workspace, search affordance, notification control, profile affordance, and reduced-motion-safe open/close transitions.

- [ ] **Step 4: Run the navigation test to verify it passes**

Run: `PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run test:ui -- --workers=1`

Expected: PASS; the drawer exposes navigation and route selection lands on Leads.

- [ ] **Step 5: Commit the shell in `merit-admin/`**

```bash
git add src/components src/app tests
git commit -m "feat: add responsive admin shell"
```

### Task 3: Build the fixture-driven operational overview

**Files:**
- Create: `merit-admin/src/data/admin-fixtures.ts`
- Create: `merit-admin/src/components/dashboard/metric-card.tsx`
- Create: `merit-admin/src/components/dashboard/leads-panel.tsx`
- Create: `merit-admin/src/components/dashboard/activity-feed.tsx`
- Create: `merit-admin/src/components/dashboard/integration-health.tsx`
- Create: `merit-admin/src/components/dashboard/content-status.tsx`
- Modify: `merit-admin/src/app/page.tsx`
- Modify: `merit-admin/tests/app-shell.spec.ts`

**Interfaces:**
- Consumes: `AdminShell` from Task 2.
- Produces: exported `dashboardMetrics`, `recentLeads`, `activities`, `integrationStatuses`, and `contentSummary` fixture collections consumed by the overview components.

- [ ] **Step 1: Write the failing dashboard-content test**

```ts
test('shows operational metrics and an actionable lead queue', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('New leads', { exact: true })).toBeVisible()
  await expect(page.getByText('Quote requests', { exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Needs attention' })).toBeVisible()
  await expect(page.getByText('Website inquiry')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Integration health' })).toBeVisible()
})
```

- [ ] **Step 2: Run the overview test to verify it fails**

Run: `PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run test:ui -- --workers=1`

Expected: FAIL because the fixture-driven dashboard sections are absent.

- [ ] **Step 3: Implement local operational fixtures and the dashboard modules**

Use representative leads, quote stages, AI handoffs, content states, integrations, and audit activity. Render metric cards, a needs-attention lead queue, a concise activity timeline, content status, and status-labelled integration health. Links and buttons are navigational/UI-only, with no mutation handlers.

- [ ] **Step 4: Run the overview test to verify it passes**

Run: `PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run test:ui -- --workers=1`

Expected: PASS with metrics, attention queue, and health information visible.

- [ ] **Step 5: Commit the operational dashboard in `merit-admin/`**

```bash
git add src/data src/components/dashboard src/app/page.tsx tests
git commit -m "feat: add admin operations dashboard"
```

### Task 4: Build the complete CMS workspace route set

**Files:**
- Create: `merit-admin/src/components/workspace/workspace-page.tsx`
- Create: `merit-admin/src/components/workspace/status-badge.tsx`
- Create: `merit-admin/src/components/workspace/data-table.tsx`
- Create: `merit-admin/src/app/leads/page.tsx`
- Create: `merit-admin/src/app/quotes/page.tsx`
- Create: `merit-admin/src/app/conversations/page.tsx`
- Create: `merit-admin/src/app/content/page.tsx`
- Create: `merit-admin/src/app/media/page.tsx`
- Create: `merit-admin/src/app/team/page.tsx`
- Create: `merit-admin/src/app/integrations/page.tsx`
- Create: `merit-admin/src/app/audit-log/page.tsx`
- Modify: `merit-admin/src/data/admin-fixtures.ts`
- Modify: `merit-admin/tests/app-shell.spec.ts`

**Interfaces:**
- Consumes: shell from Task 2 and fixture collections from Task 3.
- Produces: route-level UI for every operational area named in the admin design, using `WorkspacePage` for a consistent page title, purpose, action, controls, and content surface.

- [ ] **Step 1: Write the failing operational-routes test**

```ts
test('makes every monitored workflow available as a workspace', async ({ page }) => {
  await page.goto('/quotes')
  await expect(page.getByRole('heading', { name: 'Quotes' })).toBeVisible()
  await expect(page.getByText('Proposal')).toBeVisible()
  await page.goto('/conversations')
  await expect(page.getByRole('heading', { name: 'AI conversations' })).toBeVisible()
  await page.goto('/content')
  await expect(page.getByRole('heading', { name: 'Content' })).toBeVisible()
  await page.goto('/audit-log')
  await expect(page.getByRole('heading', { name: 'Audit log' })).toBeVisible()
})
```

- [ ] **Step 2: Run the route test to verify it fails**

Run: `PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run test:ui -- --workers=1`

Expected: FAIL because the operational routes do not exist.

- [ ] **Step 3: Implement each workspace route with representative controls and data**

Build Leads (inbox, source/status/priority controls), Quotes (pipeline stages and quote table), AI conversations (handoff queue and transcript preview), Content (collection status and publishing-ready cards), Media (asset grid and metadata), Team & roles (role matrix), Integrations (health cards), and Audit log (immutable-style activity table). Label prototype-only actions such as “Prepare quote” or “View details” without pretending that data has been changed.

- [ ] **Step 4: Run the route test to verify it passes**

Run: `PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run test:ui -- --workers=1`

Expected: PASS for Quotes, AI conversations, Content, and Audit log, while remaining navigation exposes every other view.

- [ ] **Step 5: Commit the CMS routes in `merit-admin/`**

```bash
git add src/app src/components/workspace src/data tests
git commit -m "feat: add admin CMS workspaces"
```

### Task 5: Verify the prototype and document the Supabase handoff

**Files:**
- Modify: `merit-admin/README.md`
- Modify: `merit-admin/tests/app-shell.spec.ts`

**Interfaces:**
- Consumes: all routes and fixtures from Tasks 1–4.
- Produces: a verified local prototype with a handoff document that maps fixture domains to deferred Supabase tables and auth.

- [ ] **Step 1: Add the failing navigation-coverage test**

```ts
test('navigation exposes every CMS area', async ({ page }) => {
  await page.goto('/')
  for (const label of ['Overview', 'Leads', 'Quotes', 'AI conversations', 'Content', 'Media', 'Team & roles', 'Integrations', 'Audit log']) {
    await expect(page.getByRole('link', { name: label })).toBeVisible()
  }
})
```

- [ ] **Step 2: Run the coverage test to verify it fails if any route is missing**

Run: `PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run test:ui -- --workers=1`

Expected: FAIL until every navigation item is present and reachable.

- [ ] **Step 3: Complete documentation and any missing route metadata**

Add concise setup instructions, prototype scope, screenshot/testing commands, and a Supabase handoff map for staff auth, leads, quote records, chat sessions/messages, content/revisions, media metadata, integrations, and audit events.

- [ ] **Step 4: Run all checks**

Run: `npm run lint && npm run build && PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run test:ui -- --workers=1`

Expected: all commands exit 0.

- [ ] **Step 5: Commit verification and documentation in `merit-admin/`**

```bash
git add README.md tests src
git commit -m "docs: document admin prototype handoff"
```

## Self-review

- **Spec coverage:** Tasks 1–2 implement the standalone, branded and responsive shell. Task 3 covers the overview, leads-to-watch, content status, integration health, and activity timeline. Task 4 covers all workspace areas from the spec. Task 5 proves navigation and records the Supabase boundary. Auth, APIs, persistence, uploads, and publishing are intentionally excluded by the UI-prototype decision.
- **Step scan:** Each implementation task starts with a concrete Playwright behavior and failing command, defines its exact files and exported interface, then ends with a focused verification and independent-repository commit.
- **Type consistency:** `AdminShell`, `WorkspacePage`, fixture collection names, route paths, and navigation labels are defined once and referenced consistently by later tasks.
- **Review focus:** Mobile navigation, fixture isolation, complete area coverage, text-first status clarity, and prototype control honesty are respectively covered by Tasks 2–5.
- **Proportion:** The plan defines interfaces, files, tests, and constraints without prescribing implementation bodies.

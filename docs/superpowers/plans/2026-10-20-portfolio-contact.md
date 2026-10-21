# Portfolio and Contact UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make portfolio projects easier to explore and contact information and form feedback easier to use.

**Architecture:** Keep the portfolio and contact changes independent, sharing only a browser-test harness. Use the existing project and case-study data, design-system classes, Headless UI dialog, and contact API. Browser tests intercept contact requests; no real message is sent.

**Tech Stack:** Next.js 15 App Router, React 18, TypeScript, Tailwind CSS, Headless UI, Playwright Test.

**Spec:** `docs/superpowers/specs/2026-10-20-portfolio-contact-design.md`

## Global Constraints

- Keep the existing orange and navy identity, typography, responsive layouts, dark mode and contact submission endpoint.
- Do not implement the separate site-wide animation and preloader request.
- Preserve unrelated worktree changes and existing generated build artifacts; do not commit unless the user requests it.
- Do not create new client case-study claims, unverified social accounts, exact street addresses, or unsupported response-time promises.

## Review Focus

1. Touch users must see project information without hover; test visible headings at a mobile viewport.
2. Web development must not disappear under filtering; test its category and the reset to all projects.
3. A keyboard user must enter and exit the image dialog safely; test focus, Escape and focus restoration.
4. A failed or slow submission must not lose entered data or announce success; mock failure and hold a pending request.
5. An HTTP-successful submission must show success and reset the form without sending a real message; mock a successful response.

---

### Task 1: Browser-test harness and portfolio

**Files:**
- Modify: `package.json`, `package-lock.json`, `src/app/portfolio/page.tsx`.
- Create: `playwright.config.ts`, `tests/portfolio.spec.ts`.
- Read: `src/data/case-studies.ts`, `src/app/case-studies/[slug]/page.tsx`, `docs/design-system.md`.

**Interfaces:**
- Consumes: existing `projects`, `categories`, `caseStudies`, and `MainLayout`.
- Produces: filter buttons named `All Projects`, `Brand Identity`, `UI/UX Design`, `Motion Graphics`, `Print Design`, and `Web Development`; preview buttons named `Preview <project title>`; a dialog named with the selected project title; separate links to each relevant service and `/case-studies/<slug>`.

- [ ] **Step 1: Add the test harness.** Install `@playwright/test@^1.64.1` as a development dependency; add `test:ui` as `playwright test`. Configure a web server on `127.0.0.1:3218`, Playwright Chromium, and tests under `tests/*.spec.ts`. Install/use a Playwright Chromium browser as needed. Run tests in a temporary copy of the project when the Next.js server would otherwise overwrite tracked `.next` artifacts.
- [ ] **Step 2: Write failing portfolio tests.** In `tests/portfolio.spec.ts`, use `test` and `expect` from `@playwright/test`. Assert the following actual page behavior:

```ts
test('filters by service and restores all work', async ({ page }) => {
  await page.goto('/portfolio')
  await page.getByRole('button', { name: 'Web Development', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Web Application Development' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Brand Identity Design', exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: 'All Projects', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Brand Identity Design', exact: true })).toBeVisible()
})

test('preview traps focus and Escape returns it', async ({ page }) => {
  await page.goto('/portfolio')
  const trigger = page.getByRole('button', { name: 'Preview Brand Identity Design' })
  await trigger.focus()
  await page.keyboard.press('Enter')
  const dialog = page.getByRole('dialog', { name: 'Brand Identity Design' })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('img', { name: 'Brand Identity Design' })).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Close image preview' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(dialog.getByRole('button', { name: 'Close image preview' })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
})

test('shows touch-friendly project information and existing case studies', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/portfolio')
  await expect(page.getByRole('heading', { name: 'Brand Identity Design', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: /Donor Materials That Match on Every Channel/ })).toHaveAttribute('href', '/case-studies/islamic-relief-donor-materials')
})
```

- [ ] **Step 3: Run `npm run test:ui -- tests/portfolio.spec.ts` and confirm the tests fail for missing filters, accessible viewer and case-study links.**
- [ ] **Step 4: Implement the portfolio.** Filter by explicit service categories including web development, render visible card text and separate preview/service actions, use Headless UI `Dialog` with a named close button and image alt, and render existing case studies as their own links. Keep the existing contact CTA and responsive design.
- [ ] **Step 5: Re-run the portfolio tests and confirm all pass.** Check that keyboard tabbing stays inside the open dialog and that each project has an applicable filter.

### Task 2: Contact panel and form states

**Files:**
- Modify: `src/app/contact/page.tsx`.
- Create: `tests/contact.spec.ts`.
- Read: `src/components/layout/main-layout.tsx`, `src/app/api/contact/route.ts`.

**Interfaces:**
- Consumes: existing contact form and `POST /api/contact` JSON contract; uses the same browser harness as Task 1.
- Produces: links `mailto:meritmediapro007@gmail.com`, `tel:+254714531574`, and a map search for `Roysambu, Nairobi`; existing listed social destinations without placeholders or admin links; an announced submitting state, `role="alert"` for errors, and an accessible success confirmation.

- [ ] **Step 1: Write failing contact tests.** In `tests/contact.spec.ts`, assert the following actual page behavior:

```ts
test('makes contact destinations actionable', async ({ page }) => {
  await page.goto('/contact')
  await expect(page.getByRole('link', { name: 'meritmediapro007@gmail.com' })).toHaveAttribute('href', 'mailto:meritmediapro007@gmail.com')
  await expect(page.getByRole('link', { name: /714-531 574/ })).toHaveAttribute('href', 'tel:+254714531574')
  await expect(page.getByRole('link', { name: 'Roysambu, Nairobi' })).toHaveAttribute('href', /Roysambu/i)
  await expect(page.locator('main a[href="#"]')).toHaveCount(0)
})

test('preserves input and announces an unsuccessful submission', async ({ page }) => {
  await page.route('**/api/contact', route => route.fulfill({ status: 500, json: { error: 'Unavailable' } }))
  await page.goto('/contact')
  await page.getByLabel('Name', { exact: true }).fill('Test Client')
  await page.getByLabel('Email', { exact: true }).fill('client@example.test')
  await page.getByLabel('Service Interested In').selectOption('branding')
  await page.getByLabel('Message', { exact: true }).fill('A sufficiently detailed test message.')
  await page.getByRole('button', { name: 'Send Message' }).click()
  await expect(page.getByRole('alert')).toBeVisible()
  await expect(page.getByLabel('Name', { exact: true })).toHaveValue('Test Client')
  await expect(page.getByText('Message Sent Successfully!')).toHaveCount(0)
})
```

  Add a shared `fillRequired(page: Page)` test helper that enters the same name, email, service and message as above. Also add these tests:

```ts
test('associates validation errors with their fields', async ({ page }) => {
  await page.goto('/contact')
  await page.getByRole('button', { name: 'Send Message' }).click()
  const name = page.getByLabel('Name', { exact: true })
  await expect(name).toHaveAttribute('aria-invalid', 'true')
  const errorId = await name.getAttribute('aria-describedby')
  expect(errorId).toBeTruthy()
  await expect(page.locator(`[id="${errorId}"]`)).toContainText('Name is required')
})

test('announces pending and successful submission', async ({ page }) => {
  let release!: () => void
  const pending = new Promise<void>(resolve => { release = resolve })
  await page.route('**/api/contact', async route => {
    await pending
    await route.fulfill({ status: 200, json: { success: true } })
  })
  await page.goto('/contact')
  await fillRequired(page)
  await page.getByRole('button', { name: 'Send Message' }).click()
  await expect(page.getByRole('button', { name: 'Sending...' })).toBeDisabled()
  await expect(page.getByRole('status')).toContainText('Sending')
  release()
  await expect(page.getByText('Message Sent Successfully!')).toBeVisible()
  await expect(page.getByLabel('Name', { exact: true })).toHaveValue('')
})
```

  At a mobile viewport check that the contact links and form are visible and usable. Inspect keyboard focus on the success confirmation.
- [ ] **Step 2: Run `npm run test:ui -- tests/contact.spec.ts` and confirm the tests fail for the missing actionable contact links and accessible feedback.**
- [ ] **Step 3: Implement the contact changes.** Use the site's existing social destinations where appropriate, remove unresolved placeholders and admin-dashboard links, keep the existing API call and inputs, associate validation errors with their fields, announce submission and outcome states, preserve form values on failure, reset only after success, and use neutral response-time copy. Make the information panel compact on desktop and stacked on mobile.
- [ ] **Step 4: Re-run the contact tests and confirm all pass.** Verify no test sends an external request or actual customer message.

### Task 3: Integrated verification

**Files:** All files modified by Tasks 1–2; no further behavior changes.

- [ ] Run `npm run test:ui` against a temporary copy and confirm all browser tests pass; verify both light and dark appearances at desktop and mobile widths.
- [ ] Run `npm run test:quote` and confirm all five existing quote tests pass.
- [ ] Run `npm run build` in a temporary copy with current source and a symlink to the installed dependencies, and confirm exit 0 and both routes in the output.
- [ ] Run `git diff --check` and inspect the targeted diffs; report any remaining limitations, including unverified social destinations or unavailable browser testing.

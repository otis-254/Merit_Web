# Merit Supabase Rollout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Connect the public Merit website and the standalone Merit Admin app through an installable, secure Supabase schema and typed repositories, while preserving a useful fixture-driven admin UI until environment credentials exist.

**Architecture:** A standalone `merit-contracts` repository owns Supabase migrations, seed SQL, generated-shape TypeScript definitions, and shared Zod DTOs. The public site writes visitor workflows through server-only repositories; the admin app reads and changes staff workflows through authenticated, role-aware repositories. Both applications depend only on versioned contract artifacts and never import each other’s source files.

**Tech Stack:** Supabase PostgreSQL/Auth/Storage/RLS, Next.js 15, React 18, TypeScript, `@supabase/supabase-js`, Zod, Playwright, Node test runner, Supabase CLI.

**Spec:** `docs/superpowers/specs/2026-10-21-supabase-admin-public-integration-design.md`

## Global Constraints

- Initialise `merit-contracts/` and retain `merit-admin/` as independently initialised Git repositories; exclude both from the public-site repository.
- The public browser never receives `SUPABASE_SERVICE_ROLE_KEY`; only server modules may create a service-role client.
- Enable RLS on every application table and provide no public `select` policy for leads, quotes, conversations, messages, profiles, audit events, or unpublished content.
- Preserve the current public visual design and local chat cache; Supabase changes add persistence and consent, not a user-facing redesign.
- Keep static content visible until its seeded equivalent is verified through a preview and feature flag.
- Use UUIDs and `created_at` / `updated_at` on application records; make staff changes auditable.
- Make development configuration explicit through `.env.example`; production must return a safe service-unavailable result rather than silently drop data when Supabase is not configured.
- Do not install a real schema, create a Supabase project, migrate Neon data, or use production credentials without the user supplying that project’s environment values.

## Review Focus

- Missing or incorrectly scoped service-role keys: verify browser bundles and public responses never expose secrets; covered in Task 3.
- RLS role escalation: verify an authenticated analyst cannot mutate records and a sales user cannot publish content; covered in Task 2.
- Duplicate form/chat delivery caused by retries: verify idempotency keys deduplicate contact, quote, and message submissions; covered in Tasks 4–6.
- Visitors declining chat retention: verify Gemini streaming remains usable but creates no Supabase conversation/message rows; covered in Task 6.
- Partial content migration: verify published content falls back to the static collection when Supabase returns no matching published record; covered in Task 8.

### Task 1: Stabilise and complete the standalone admin shell baseline

**Files:**
- Modify: public `.gitignore`
- Modify: `merit-admin/src/app/globals.css`
- Modify: `merit-admin/src/app/layout.tsx`
- Modify: `merit-admin/src/app/page.tsx`
- Create: `merit-admin/src/app/leads/page.tsx`
- Create: `merit-admin/src/components/layout/admin-{navigation,sidebar,topbar,shell}.tsx`
- Modify: `merit-admin/tests/app-shell.spec.ts`

**Interfaces:**
- Produces: `AdminShell({ children }: { children: ReactNode })` and the committed responsive navigation baseline used by every subsequent admin route.

- [ ] **Step 1: Verify the existing mobile-navigation test fails before the shell code is restored/committed**

Run: `env PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm --prefix merit-admin run test:ui -- --workers=1`

Expected: a failure if the mobile trigger, navigation destination, or layout integration is missing.

- [ ] **Step 2: Restore and commit the approved responsive shell only in `merit-admin/`**

Ensure `merit-admin` has a dark-navy responsive sidebar, white workspace, global search affordance, notifications/profile controls, reduced-motion transitions, and all planned route links. Add `/merit-contracts/` to the public `.gitignore` without touching unrelated public-site changes.

- [ ] **Step 3: Verify the shell behavior and commit inside the correct repository**

Run: `env PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm --prefix merit-admin run test:ui -- --workers=1`

Expected: desktop workspace and mobile open/navigate/close behavior pass.

Commit: `git -C merit-admin add src/app src/components tests && git -C merit-admin commit -m "feat: add responsive admin shell"`.

### Task 2: Create the versioned Supabase contract and schema

**Files:**
- Create: `merit-contracts/supabase/migrations/0001_merit_core.sql`
- Create: `merit-contracts/supabase/seed.sql`
- Create: `merit-contracts/src/database.types.ts`
- Create: `merit-contracts/src/contracts/{leads,quotes,conversations,content}.ts`
- Create: `merit-contracts/src/index.ts`
- Create: `merit-contracts/package.json`
- Create: `merit-contracts/.env.example`
- Create: `merit-contracts/README.md`
- Test: `merit-contracts/tests/contracts.test.ts`

**Interfaces:**
- Produces: `LeadInput`, `QuoteRequestInput`, `ConversationMessageInput`, `ContentItemDTO`, `AppRole`, and `Database` definitions shared by both app repositories.

- [ ] **Step 1: Write failing contract tests for valid and invalid DTOs**

```ts
test('rejects a quote request without selected services', () => {
  expect(() => QuoteRequestInput.parse({ services: [], quantity: 1, urgency: 'normal', businessType: 'existing' })).toThrow()
})

test('accepts a consented visitor chat message with an idempotency key', () => {
  expect(ConversationMessageInput.parse({ visitorToken: 'a-valid-opaque-token', consent: true, idempotencyKey: 'a-key', role: 'user', content: 'Hello' }).content).toBe('Hello')
})
```

- [ ] **Step 2: Run the contract tests to verify they fail**

Run: `npm --prefix merit-contracts test`

Expected: FAIL because the contract package and schemas do not exist.

- [ ] **Step 3: Implement the contract package and installable SQL migration**

Create the enums, UUID tables, indexes, timestamps, `profiles` trigger, role helper functions, RLS, storage policy definitions, audit trigger/function, idempotency columns/unique indexes, and fixture seed rows described in the approved design. The migration must include the tables `profiles`, `leads`, `lead_tags`, `lead_tag_links`, `lead_activities`, `quote_requests`, `quotes`, `ai_conversations`, `ai_messages`, `content_items`, `content_revisions`, `media_assets`, `integration_checks`, `notification_rules`, and `audit_events`.

- [ ] **Step 4: Run static migration checks and contract tests**

Run: `npm --prefix merit-contracts test && npx supabase db lint --workdir merit-contracts`

Expected: DTO tests pass and the Supabase migration lints with no policy or SQL errors.

- [ ] **Step 5: Commit the contracts repository**

Commit: `git -C merit-contracts add . && git -C merit-contracts commit -m "feat: define Merit Supabase contract"`.

### Task 3: Add safe Supabase client modules and configuration boundaries

**Files:**
- Modify: public `package.json`, `README.md`, `.env.example`
- Create: public `src/lib/supabase/{config,server,service}.ts`
- Create: public `src/lib/contracts.ts`
- Modify: `merit-admin/package.json`, `README.md`, `.env.example`
- Create: `merit-admin/src/lib/supabase/{config,browser,server,middleware}.ts`
- Test: public `tests/supabase-config.test.mjs`, admin `tests/supabase-config.test.ts`

**Interfaces:**
- Consumes: `Database` and DTOs from `merit-contracts`.
- Produces: `getPublicSupabaseConfig()`, `getPublicServerClient()`, `getPublicServiceClient()`, `createAdminBrowserClient()`, and `createAdminServerClient()`.

- [ ] **Step 1: Write failing configuration tests**

Test that the browser configuration accepts only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, while service-client construction throws when `SUPABASE_SERVICE_ROLE_KEY` is missing or is requested by browser code.

- [ ] **Step 2: Run the configuration tests to verify they fail**

Run: `npm run test:supabase && npm --prefix merit-admin run test:supabase`

Expected: FAIL because no client boundary exists.

- [ ] **Step 3: Implement environment validation, server-only imports, and `.env.example` files**

Add the official Supabase SDK to both applications. Copy the contract package through a versioned local tarball/workspace development path without cross-importing application source. Remove the public contact route’s runtime schema-creation dependency on Neon; retain its existing Neon module untouched until the reviewed data-import phase.

- [ ] **Step 4: Run configuration tests and repository builds**

Run: `npm run test:supabase && npm --prefix merit-admin run test:supabase && npm run build && npm --prefix merit-admin run build`

Expected: all commands pass with no service-role value embedded in browser output.

- [ ] **Step 5: Commit repository-local wiring separately**

Commit public-site wiring and admin wiring in their respective repositories; do not commit unrelated dirty public-site files.

### Task 4: Persist public contact submissions as leads

**Files:**
- Create: `src/lib/repositories/leads.ts`
- Modify: `src/app/api/contact/route.ts`
- Modify: `tests/contact.spec.ts`
- Create: `tests/contact-api.test.mjs`

**Interfaces:**
- Consumes: `LeadInput`, `getPublicServiceClient()`.
- Produces: `createLead(input: LeadInput, idempotencyKey: string): Promise<{ id: string }>` and a contact route response with `submissionId` equal to the Supabase lead UUID.

- [ ] **Step 1: Write failing API tests for valid input, invalid input, unavailable configuration, and duplicate idempotency keys**

Use a repository fake at the persistence boundary, not a mocked route. Assert that duplicate deliveries return the original UUID and only create one lead activity.

- [ ] **Step 2: Run the contact API tests to verify they fail**

Run: `node --test tests/contact-api.test.mjs`

Expected: FAIL because the lead repository and Supabase route contract do not exist.

- [ ] **Step 3: Implement the validated contact-to-lead adapter**

Map the existing form fields to `leads` with `source = contact_form`, append a system `lead_activity`, carry the idempotency key from a request header, and preserve EmailJS notification behavior without logging personal payloads or credentials.

- [ ] **Step 4: Run API and UI contact checks**

Run: `node --test tests/contact-api.test.mjs && env PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run test:ui -- tests/contact.spec.ts --workers=1`

Expected: valid form behavior works, unavailable configuration is safe, and duplicate delivery is idempotent.

- [ ] **Step 5: Commit only contact integration files**

Commit the API route, repository, tests, package metadata, and environment template while leaving unrelated public worktree changes alone.

### Task 5: Persist quote requests before WhatsApp handoff

**Files:**
- Create: `src/app/api/quote-requests/route.ts`
- Create: `src/lib/repositories/quotes.ts`
- Modify: `src/components/ProgressQuoteForm.tsx`
- Modify: `src/lib/quote.ts`
- Test: `tests/quote-api.test.mjs`, `tests/quote-progress.spec.ts`

**Interfaces:**
- Consumes: existing `QuoteSelection`, `QuoteRequestInput`, and `getPublicServiceClient()`.
- Produces: `createQuoteRequest(selection, visitorToken, idempotencyKey): Promise<{ id: string; min: number; max: number }>`.

- [ ] **Step 1: Write failing quote persistence tests**

Assert that the API recalculates the client-provided price range server-side, rejects unknown services, records an anonymous request with an idempotency key, and returns a WhatsApp URL only after persistence succeeds.

- [ ] **Step 2: Run quote tests to verify they fail**

Run: `node --test tests/quote-api.test.mjs && env PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run test:ui -- tests/quote-progress.spec.ts --workers=1`

Expected: FAIL because quote persistence is absent.

- [ ] **Step 3: Implement quote request persistence and user feedback**

Use the existing quote calculator on the server as the source of truth, then open WhatsApp only after the returned request ID is stored. Show a non-sensitive retry state rather than sending the visitor to WhatsApp when storage fails.

- [ ] **Step 4: Run focused quote checks**

Run: `npm run test:quote && node --test tests/quote-api.test.mjs && env PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run test:ui -- tests/quote-progress.spec.ts --workers=1`

Expected: all range, persistence, and handoff checks pass.

- [ ] **Step 5: Commit quote integration files**

Commit only the form, route, repository, and focused tests.

### Task 6: Add consented AI session persistence without changing Gemini behavior

**Files:**
- Create: `src/app/api/chat/session/route.ts`
- Create: `src/lib/repositories/conversations.ts`
- Modify: `src/app/api/chat/route.ts`
- Modify: `src/components/ui/live-chat.tsx`
- Test: `tests/chat-session-api.test.mjs`, `tests/ai-chat.spec.ts`

**Interfaces:**
- Consumes: `ConversationMessageInput`, `getPublicServiceClient()`.
- Produces: `createConversationSession(visitorToken, consent): Promise<{ id?: string; retained: boolean }>` and `appendConversationMessage(sessionId, message, idempotencyKey)`.

- [ ] **Step 1: Write failing tests for consent and idempotency**

Assert that a visitor declining retention receives Gemini output but no persistence call, while a consenting visitor creates one session and appends ordered user/model messages exactly once per idempotency key.

- [ ] **Step 2: Run chat tests to verify they fail**

Run: `node --test tests/chat-session-api.test.mjs && env PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run test:ui -- tests/ai-chat.spec.ts --workers=1`

Expected: FAIL because consent/session persistence is absent.

- [ ] **Step 3: Implement server persistence around the existing NDJSON Gemini stream**

Create an opaque visitor token client-side, request consent before retaining chat, persist the user message before Gemini, buffer and append the completed model response after streaming, and preserve local-storage restoration for the visible client history.

- [ ] **Step 4: Run chat checks**

Run: `node --test tests/chat-session-api.test.mjs && env PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run test:ui -- tests/ai-chat.spec.ts --workers=1`

Expected: consent, stored session, local restore, mood/error states, and stream handling pass.

- [ ] **Step 5: Commit chat integration files**

Commit only the route, client component, repository, and relevant tests.

### Task 7: Build the admin operational workspaces on fixture/repository adapters

**Files:**
- Create: `merit-admin/src/data/admin-fixtures.ts`
- Create: `merit-admin/src/lib/repositories/{leads,quotes,conversations,content,operations}.ts`
- Create: `merit-admin/src/components/dashboard/*`
- Create: `merit-admin/src/components/workspace/{workspace-page,data-table,status-badge}.tsx`
- Create: `merit-admin/src/app/{quotes,conversations,content,media,team,integrations,audit-log}/page.tsx`
- Modify: `merit-admin/src/app/{page,leads}/page.tsx`
- Modify: `merit-admin/tests/app-shell.spec.ts`

**Interfaces:**
- Consumes: `AdminShell`, contract DTOs, and repository interfaces returning `Promise<Lead[]>`, `Promise<Quote[]>`, `Promise<Conversation[]>`, `Promise<ContentItem[]>`, and `Promise<AuditEvent[]>`.
- Produces: a complete route set that can switch from fixtures to authenticated Supabase repositories via one data-source configuration flag.

- [ ] **Step 1: Write failing browser tests for the operational dashboard and route coverage**

Assert that Overview displays New leads, Quote requests, Needs attention, Website inquiry, and Integration health; assert Quotes, AI conversations, Content, Media, Team & roles, Integrations, and Audit log have visible headings and their navigation links are usable.

- [ ] **Step 2: Run admin browser tests to verify they fail**

Run: `env PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm --prefix merit-admin run test:ui -- --workers=1`

Expected: FAIL because fixture-backed operational modules and routes are absent.

- [ ] **Step 3: Implement the full workspace UI and adapter interface**

Build dashboard metrics, attention queue, timeline, content status, integration health, lead/quote/conversation tables, content/media views, role matrix, and append-only audit view. Fixture repositories are the default until `NEXT_PUBLIC_SUPABASE_URL` is configured; the Supabase implementations have identical return contracts. Controls must label prototype/disabled actions until mutation endpoints are present.

- [ ] **Step 4: Run admin browser checks and build**

Run: `env PLAYWRIGHT_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm --prefix merit-admin run test:ui -- --workers=1 && npm --prefix merit-admin run build`

Expected: all workspace routes render and production build completes.

- [ ] **Step 5: Commit in `merit-admin` only**

Commit: `git -C merit-admin add src tests package.json package-lock.json README.md && git -C merit-admin commit -m "feat: add operational CMS workspaces"`.

### Task 8: Add content, media, and operation repositories with staged public reads

**Files:**
- Create: public `src/lib/repositories/content.ts`, `src/lib/content-source.ts`
- Modify: public `src/data/{blog-posts,case-studies,testimonials}.ts`
- Create: `merit-admin/src/lib/repositories/{media,operations}.ts`
- Modify: admin Content, Media, Team, Integrations, Audit log routes
- Test: `tests/content-source.test.mjs`, `merit-admin/tests/operations.spec.ts`

**Interfaces:**
- Consumes: `ContentItemDTO`, `MediaAssetDTO`, `AuditEventDTO`.
- Produces: `getPublishedContent(type, slug)`, `getContentCollection(type)`, and repository methods for revisions, signed-media metadata, integration checks, and audit listing.

- [ ] **Step 1: Write failing source-selection and permissions tests**

Assert that no published Supabase record falls back to the matching static item, a draft item is never returned publicly, and an analyst cannot invoke a repository mutation.

- [ ] **Step 2: Run source-selection and permission tests to verify they fail**

Run: `node --test tests/content-source.test.mjs && npm --prefix merit-admin run test:operations`

Expected: FAIL because the staged source and operations repositories are absent.

- [ ] **Step 3: Implement published-read fallback, media metadata, content revision, operation, and audit adapters**

Keep the public feature flag defaulted to static content. Implement only server-side publication/revalidation hooks; no automatic publication or live Storage upload is activated without Supabase configuration.

- [ ] **Step 4: Run focused tests and both app builds**

Run: `node --test tests/content-source.test.mjs && npm --prefix merit-admin run test:operations && npm run build && npm --prefix merit-admin run build`

Expected: static fallback, draft protection, and role boundary checks pass.

- [ ] **Step 5: Commit each repository’s implementation separately**

Commit public and admin changes in their own repositories only.

### Task 9: Document project setup, migration, and cut-over verification

**Files:**
- Create: `merit-contracts/docs/{supabase-setup,neon-import,content-cutover}.md`
- Modify: public `README.md`, `merit-admin/README.md`, `merit-contracts/README.md`
- Create: `merit-contracts/scripts/verify-schema.mjs`
- Test: `merit-contracts/tests/verify-schema.test.mjs`

**Interfaces:**
- Consumes: the schema migration and application `.env.example` contracts.
- Produces: a human-run setup sequence, a preflight schema verifier, and reversible checklists for Neon data import and per-collection content cut-over.

- [ ] **Step 1: Write a failing schema-preflight test**

Test that `verify-schema.mjs` returns an actionable missing-table/policy result against an incomplete information-schema fixture and a success summary against the complete expected table list.

- [ ] **Step 2: Run the preflight test to verify it fails**

Run: `npm --prefix merit-contracts test -- verify-schema.test.ts`

Expected: FAIL because the verifier does not exist.

- [ ] **Step 3: Implement setup documentation and schema verification**

Document Supabase project creation, Auth redirect URLs, environment variables, owner bootstrap, migration apply command, Storage bucket creation, Neon import dry run, content preview, rollback feature flags, and how to run the verifier with the service-role key from a server-only shell.

- [ ] **Step 4: Run all planned verification commands**

Run: contract tests, migration lint, public unit/UI/build commands, admin UI/build commands, and the schema verifier against a configured project when credentials are supplied.

Expected: all local checks pass; credential-dependent verifier reports “not run” rather than a false success when no project values exist.

- [ ] **Step 5: Commit documentation separately in `merit-contracts`, public site, and `merit-admin`**

Do not push, deploy, apply migrations, or import production data as part of this task.

## Self-review

- **Spec coverage:** Task 1 stabilises the approved admin shell; Task 2 covers the full schema, roles, RLS, audits, and shared DTOs; Tasks 3–6 establish safe public contact, quote, and consented AI paths; Task 7 completes every admin workspace; Task 8 handles content, media, operations, and staged reads; Task 9 covers setup, migration, and cut-over verification. Payment, public accounts, automatic publication, and production data movement remain out of scope.
- **Step scan:** Each task has a focused observable behavior, a red run, exact interfaces/files, green verification, and repository-scoped commit command.
- **Type consistency:** Task 2 defines the `Database`/DTO vocabulary consumed in Tasks 3–8; repository names and return contracts remain consistent across public and admin usage.
- **Review focus:** Secret boundaries, RLS, idempotency, chat consent, and partial content migration each have a named owning task and regression check.
- **Proportion:** The plan defines the approved contract and behavior without prescribing implementation bodies or production credentials.

# Merit Supabase Integration Design

## Intent

Turn the standalone `merit-admin` prototype and the public Merit website into two applications backed by one Supabase project. When the Supabase schema and environment values are installed, incoming contact requests, quote requests, and AI handoffs become operational records in the admin CMS; staff can subsequently manage the same records and publish website content from a controlled workspace.

This document is intentionally an approval gate. It specifies the database contract, the integration seams, and the build phases before any production schema or application wiring is added.

## Default decisions

These are implementation defaults, chosen because the user asked to proceed with sensible defaults.

- Supabase provides PostgreSQL, Auth, Row Level Security (RLS), Storage, and Realtime-ready data access.
- `merit-admin` is the staff-facing Next.js app and uses Supabase Auth for staff sign-in.
- The public site never receives the Supabase service-role key. Its Next.js route handlers validate visitor input and write through server-only modules.
- The admin browser uses the Supabase anon key only after staff authentication; server-side administrative operations use a server-only service-role client where required.
- All database records use UUID primary keys, `created_at`, and `updated_at`; business-state changes and publish actions create audit events.
- Existing static site data stays visible until its equivalent CMS records are seeded and the public renderer is switched over. There is no content cut-over by accident.

## What becomes connected

```text
Public website                 Supabase                     Merit Admin
──────────────                 ─────────                    ───────────
Contact form ───────────────► leads ──────────────────────► Lead inbox
Quote wizard ───────────────► quote_requests ─────────────► Quote pipeline
AI chat session ────────────► conversations/messages ─────► AI handoffs
Content read API ◄────────── content + revisions ◄──────── Content studio
Image URLs ◄──────────────── media_assets/storage ◄─────── Media library
                              audit_events ◄────────────── All staff actions
```

## Schema contract

### Identity and permissions

| Table / function | Purpose | Initial access |
| --- | --- | --- |
| `profiles` | One row per Supabase Auth user: name, email, avatar, role, active state. | A signed-in user reads their own profile; owner/admin manage all profiles. |
| `is_staff()` | Security-definer helper that verifies an active profile exists for `auth.uid()`. | Used by RLS policies only. |
| `has_role(roles app_role[])` | Security-definer helper for owner/admin/editor/sales/analyst permissions. | Used by RLS policies only. |

`app_role` is an enum: `owner`, `administrator`, `editor`, `sales`, `analyst`. New profiles default to `analyst` until an owner assigns a role.

### Customer and commercial workflow

| Table | Key fields | Purpose |
| --- | --- | --- |
| `leads` | name, email, phone, company, source, service_interest, message, status, priority, owner_id, next_follow_up_at | One inbox record for contact forms, quote requests, manual entries, and AI handoffs. |
| `lead_tags` / `lead_tag_links` | tag name, lead id | Reusable lead categorisation without comma-separated fields. |
| `lead_activities` | lead id, actor id, type, body, metadata, occurred_at | Notes, assignments, calls, status changes, and system events. |
| `quote_requests` | lead id, selected services, quantity, urgency, business type, range minimum/maximum, currency, WhatsApp handoff timestamp | Stores the public wizard’s calculated request before its WhatsApp handoff. |
| `quotes` | lead id, quote request id, amount, currency, valid_until, stage, sent_at, won/lost timestamps | A staff-owned exact proposal pipeline. |

`lead_status` is `new`, `qualified`, `contacted`, `proposal`, `won`, `lost`, `archived`. `quote_stage` is `new`, `contacted`, `proposal`, `won`, `lost`.

### AI monitoring

| Table | Key fields | Purpose |
| --- | --- | --- |
| `ai_conversations` | anonymous visitor token, optional lead id, status, handoff flag, consent timestamp, last_message_at | A persisted chat session without assuming the visitor has an account. |
| `ai_messages` | conversation id, role, content, model, tokens, created_at | Ordered visitor/assistant transcript records. |

The public chat keeps local storage as a convenience cache, but the server-generated opaque visitor token becomes the database lookup key. No browser can enumerate other visitor sessions. A visitor consent prompt is required before messages are retained in Supabase.

### Content and media

| Table | Key fields | Purpose |
| --- | --- | --- |
| `content_items` | type, slug, title, excerpt, body JSON, status, SEO fields, author id, publication timestamps | A generic collection for pages, services, portfolio, case studies, posts, testimonials, menus, redirects, and site settings. |
| `content_revisions` | content item id, snapshot JSON, author id, note, created_at | Immutable revision history before and after publication. |
| `media_assets` | bucket/path, alt text, caption, credit, mime type, dimensions, replacement id | Metadata for Supabase Storage objects. |

`content_type` is an enum with `page`, `service`, `portfolio`, `case_study`, `post`, `testimonial`, `menu`, `site_setting`, and `redirect`. `content_status` is `draft`, `review`, `scheduled`, `published`, or `archived`.

### Operations

| Table | Key fields | Purpose |
| --- | --- | --- |
| `integration_checks` | integration key, status, checked_at, detail | Last-known health for Supabase, email, Gemini, public site, and PWA. |
| `notification_rules` | event, channel, recipient/profile, enabled | Staff-configured notification preferences. |
| `audit_events` | actor id, action, entity type/id, before/after JSON, created_at | Append-only governance record. |

## Security model

- Enable RLS on every application table.
- There are no public `select` policies on leads, quotes, conversations, messages, staff profiles, audit records, or unpublished content.
- Public website form/chat routes use a server-only service-role client after input validation, rate limiting, and origin checks; they never query arbitrary records back to a visitor.
- Authenticated staff can read only the operational areas their role permits. Sales cannot publish content; editors cannot manage users or integration configuration; analysts are read-only; owner/administrator manage settings and roles.
- Staff changes call an audit-event database function or repository helper; audit rows cannot be updated or deleted by normal staff roles.
- Supabase Storage uses a private `merit-media` bucket with signed URLs for preview/upload workflows. Publicly published content receives a safe public delivery URL only when its media policy allows it.

## Modules to build after approval

### Shared schema package

Create a versioned `merit-contracts` package or a small shared schema repository containing:

- Supabase SQL migrations, enum definitions, RLS policies, triggers, indexes, seed data, and generated TypeScript database types.
- Zod request schemas and shared public DTOs for contact, quote, AI session, content preview, and media metadata.
- A short migration runbook and a `.env.example` naming the required variables without storing secrets.

This avoids importing code directly between the public site and the admin app while keeping both applications aligned with one contract.

### Public-site modules

| Module | Responsibility | Existing component it replaces/extends |
| --- | --- | --- |
| `src/lib/supabase/server.ts` | Creates the server-only Supabase client. | Replaces direct Neon writes for new submissions. |
| `src/lib/repositories/leads.ts` | Validates and records contact/quote leads and activities. | Extends `src/app/api/contact/route.ts`. |
| `src/lib/repositories/quotes.ts` | Persists quote selections and computes the existing range. | Extends `src/lib/quote.ts` and the quote form. |
| `src/lib/repositories/conversations.ts` | Creates consented sessions and appends AI messages. | Extends `src/app/api/chat/route.ts`. |
| `src/lib/repositories/content.ts` | Reads only published content and caches/revalidates it. | Replaces static-data reads gradually. |

The user-facing UI keeps its existing visual design and error states. If Supabase is not configured, only development mode may use an explicit local fallback; production fails safely with a non-sensitive “service unavailable” response instead of dropping data.

### Admin modules

| Module | Responsibility | Initial UI surface |
| --- | --- | --- |
| `src/lib/supabase/browser.ts` / `server.ts` | Role-aware clients and session handling. | Sign-in and shell session state. |
| `src/repositories/leads.ts` | Inbox queries, assignments, activities, tags, follow-ups. | Leads dashboard/workspace. |
| `src/repositories/quotes.ts` | Request-to-quote pipeline. | Quotes workspace. |
| `src/repositories/conversations.ts` | Handoff queue and transcript access. | AI conversations workspace. |
| `src/repositories/content.ts` | Drafts, revisions, publishing, preview. | Content workspace. |
| `src/repositories/media.ts` | Signed uploads, metadata, replacement relationships. | Media workspace. |
| `src/repositories/operations.ts` | Profiles, integrations, audit events, notification rules. | Team, integrations, audit-log workspaces. |

The current static fixture module remains a documented adapter until each repository has a live implementation. That makes the UI buildable and reviewable before credentials exist.

## Migration approach

1. Apply the schema and seed the first owner profile after creating the Supabase project.
2. Import `contact_submissions` from Neon into `leads` with `source = contact_form`, retaining source IDs in migration metadata.
3. Save new quote submissions before opening WhatsApp; do not attempt to reconstruct historical WhatsApp chats.
4. Start new consented AI sessions only after the chat persistence route is deployed; do not silently import browser-local chat histories.
5. Seed static blogs, case studies, testimonials, and services as draft content items; compare preview routes before changing public reads.
6. Switch one public collection at a time from static data to published Supabase reads; retain a rollback feature flag for each collection.

## Approval checkpoints

| Checkpoint | Buildable after approval | Produces |
| --- | --- | --- |
| A. Foundation | Supabase migrations, types, Auth shell, RLS tests, environment templates. | A secure, empty operational platform. |
| B. Customer workflows | Public contact/quote/chat persistence routes plus admin Leads, Quotes, and AI workspaces. | A complete lead-to-handoff loop. |
| C. Content operations | Content, revision, media, and published-read modules plus admin studio screens. | CMS-managed public content with drafts and previews. |
| D. Operations | Roles, audit UI, integration checks, notification preferences. | Governed staff administration. |
| E. Cut-over | Neon import, content seeding, revalidation, quality checks, and per-collection rollout flags. | Controlled production migration. |

## Explicit non-goals for the first connected release

- Payment processing, accounting, invoicing, or a WhatsApp replacement.
- A public user account system.
- Automatic publication without staff review.
- Exposing API keys, service-role credentials, raw AI configuration, or database connections to browsers.
- Moving existing production data until the migration has been reviewed and a Supabase project exists.

## Approval needed

Approve any combination of checkpoints A–E. The recommended sequence is **A → B → C → D → E**, because the database contract and staff permissions must exist before the user-facing workflows and CMS depend on them.

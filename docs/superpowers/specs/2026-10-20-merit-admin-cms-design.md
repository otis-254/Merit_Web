# Merit Admin CMS design

## Intent

Create a separate `merit-admin` repository containing the operational CMS for Merit Graphics. It gives authorised staff one place to monitor and act on every customer-facing workflow and to publish the site content without editing the public-site source files.

The approved visual direction is a compact dark-navy sidebar, white operational workspace, Merit-orange actions, a global search affordance, outcome-focused metric cards, and an inbox-first dashboard.

## Goals

- Monitor and action incoming contacts, quote requests, AI handoffs, and follow-ups.
- Manage all publishable website content: pages, services, portfolio items, case studies, blog posts, testimonials, navigation, SEO metadata, and media.
- Show integration health for Neon, email delivery, Gemini, the public website, and PWA version.
- Keep a traceable audit record of user actions and content publication.
- Support roles: owner, administrator, editor, sales, and analyst.
- Live in an independently initialised Git repository at `merit-admin/`; it is not a nested feature branch of the public site.

## UI prototype delivery

The immediate delivery is a standalone, high-fidelity **UI-only** prototype. It includes the full operational information architecture, responsive navigation, representative local data, filters, search affordances, status treatments, empty/loading-ready states, and clear calls to action. It deliberately excludes authentication, Supabase wiring, database migrations, API routes, uploads, mutations, real-time updates, and production publication.

Supabase will provide staff authentication and the operational data layer in a later implementation phase. The UI must therefore keep static fixture data behind focused data modules so the Supabase queries can replace those modules without redesigning the interface.

## Non-goals for the first release

- Rebuild accounting, invoicing, or payment processing.
- Replace WhatsApp; instead, record and manage a lead before or after its WhatsApp handoff.
- Expose API keys or service secrets to CMS users.
- Make unmoderated AI changes to public content.

## Product areas

### Overview dashboard

The landing workspace shows new leads, quote requests awaiting response, AI chats requiring handoff, content status, integration health, and an activity timeline. Each metric links to the filtered operational view behind it.

### Leads inbox and CRM

The inbox unifies contact-form submissions, quote-form submissions, manual leads, and AI handoffs. A lead has contact details, source, service interest, estimated quote range, owner, status, priority, notes, tags, activities, and next-follow-up date. Sales users can assign, update status, create notes, and open the source conversation.

### Quotes and pipeline

Quote configurations and the calculated range are saved before the visitor goes to WhatsApp. Staff can turn a request into a quote record, attach an exact amount, set a validity date, track `new → contacted → proposal → won/lost`, and log follow-up actions.

### AI conversations

The public chat changes from browser-only history to a server-persisted session and message model. The admin view lists conversations, visitor identifiers when supplied, state, timestamps, conversation transcript, handoff flags, and a staff note/action. The public experience keeps local storage as a convenience cache, but the server database becomes the monitoring record. A consent notice is shown before retaining chat history.

### Content studio

Collections cover pages, services, portfolio items, case studies, posts, testimonials, site settings, menus, SEO metadata, redirects, and media. Entries have draft, review, scheduled, published, archived states; preview links; revision history; author and publication timestamps. Publishing triggers cache revalidation on the public site.

### Media library

Upload and organise images/documents by alt text, caption, credit, dimensions, usage references, and replacement history. The initial implementation stores assets in an object-storage provider; the database retains metadata and references.

### Operations

Users and roles, integration status, audit trail, environment-safe settings, public-site deployment links, and notification rules live here. High-risk actions require owner/admin role and confirm before execution.

## Shared system architecture

```text
Public Merit site ──┐
                    ├── shared API / database contract ── Neon PostgreSQL
Merit Admin CMS ────┘                                  ├── content + revisions
                                                        ├── leads + quotes
                                                        ├── chat sessions/messages
                                                        ├── users/roles/audit events
                                                        └── media metadata
```

`merit-admin` is a dedicated Next.js + TypeScript + Tailwind application with its own `.git`, package lock, deployment, environment variables, tests, and README. The public site remains its own repository. Shared contracts are versioned through an API schema/package rather than imports across repositories.

The public site will gain authenticated server endpoints for content delivery, quote submission, chat persistence, image URLs, and revalidation. The admin CMS talks only to these authenticated server boundaries and the database; browser clients never receive Neon, Gemini, email, or storage credentials.

## Data migration

The current public site keeps blog posts, case studies, and testimonials in TypeScript data files; these become seeded CMS entries. The existing `contact_submissions` Neon table becomes the first lead source. Current quote flows only prepare a WhatsApp message, so submission persistence must be added. Current chat messages are local-storage-only, so server-side session persistence and consent must be added before chats can be monitored.

## Security and governance

- Server-side authenticated routes enforce permissions for every record action.
- Roles are scoped: editor cannot manage users or integrations; sales cannot publish; analyst is read-only; owner manages all settings.
- Audit events record actor, action, object type/id, timestamp, and before/after summary.
- Data retention and delete/export controls apply to leads and chat transcripts.
- Rate limits, input validation, CSRF protection, and signed upload URLs protect operational APIs.

## Delivery phases

1. Initialise the standalone repository, authentication, role system, design shell, database migrations, and API contract.
2. Build dashboard, leads inbox, quote pipeline, contact migration, notes, follow-ups, and audit logs.
3. Build content studio, media library, drafts/previews/publishing, static-content migration, and public-site revalidation.
4. Add persisted AI sessions, handoff workflows, consent/retention, integration health, notifications, and analytics.

## Decisions made

- The approved unified dashboard design is the default layout.
- The CMS is a separate repository, not a folder embedded in the public-site Git history.
- Neon PostgreSQL remains the initial data store because the existing public site already uses it for contact submissions.
- The CMS controls all monitorable public-site workflows, but untracked WhatsApp and local-only events must first be captured server-side.

## Deferred production decision

Supabase will provide staff authentication and the data layer when the UI prototype is connected. The production policy for user provisioning, password/MFA, and environment credentials is deferred until that integration phase.

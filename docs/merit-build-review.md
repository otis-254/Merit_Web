# Merit Graphics build review

## Current design summary

Merit Graphics is a Next.js 14 App Router marketing site for a Nairobi-based creative design and development agency. The experience is built around a warm, visual portfolio presentation with Poppins typography, Tailwind CSS, Framer Motion/GSAP animation, dark-mode styling, and strong conversion paths to the contact page and WhatsApp.

The main information architecture is:

- Home: positioning, service overview, featured work, testimonials, articles, quote entry point, and contact prompts.
- Services: grouped service landing page plus dedicated pages for brand identity, UI/UX, motion graphics, print design, and web-app development.
- Portfolio and case studies: visual work discovery with project detail routes.
- Blog: article listing and individual article pages.
- About: team, company context, and social proof.
- Contact: validated enquiry form, database persistence through Neon, email notifications through EmailJS, and a client-side quote estimator with WhatsApp handoff.

The visual system favors large imagery, rounded cards, gradient accents, motion-led transitions, responsive layouts, and reusable layout/navigation components. Content is mostly maintained in typed data modules under `src/data`, while page-level presentation remains in route components.

## What is working well

- Clear commercial goal: most routes lead toward contact, WhatsApp, or a quote.
- Good breadth of service and portfolio content for an agency site.
- Reusable data-driven content exists for blog posts, testimonials, case studies, and navigation.
- The contact flow combines a human channel (WhatsApp) with a structured form and database storage.
- SEO foundations are present: route metadata, sitemap/robots routes, canonical metadata, and Organization JSON-LD.
- Responsive and accessible foundations are visible in alt text, button labels, keyboard-friendly links, and mobile navigation states.

## Loopholes and improvements

### P0 — protect production data and secrets

The contact API contains hard-coded fallback EmailJS service/template/public identifiers and logs complete request payloads. Even if the public EmailJS key is intentionally public, the configuration should be environment-only and request contents should never be logged in production.

Acceptance criteria:

- Required email/database configuration fails clearly when absent instead of silently falling back.
- Logs contain an event name and submission ID, not email addresses, message bodies, or full provider payloads.
- Production errors are observable without exposing personal data.

### P0 — validate and rate-limit the contact endpoint server-side

The browser schema is useful for UX, but the API only checks whether four fields are present. It needs length limits, normalized values, email/phone validation, a service allowlist, a honeypot or CAPTCHA strategy, and rate limiting to reduce spam and abuse.

Acceptance criteria:

- Invalid or oversized JSON receives a safe `400` response.
- Repeated submissions from one client are throttled.
- Stored data is normalized and does not accept arbitrary service values.
- The form communicates failure without losing the user’s entered data.

### P1 — remove broken conversion links

The Contact page still uses `href="#"` for Instagram, LinkedIn, and Twitter. These links appear actionable but do not take visitors anywhere. Replace them with verified URLs or remove the items until the accounts are confirmed.

### P1 — align quote coverage with the service catalog

The quote estimator covers logo, brand identity, social media, company profile, website, and printing, while the primary service catalog also includes UI/UX, motion graphics, and web-app development. Add the missing quote options or explicitly explain that those services require a custom quote.

Also move quote pricing and multipliers into a versioned data/config module so pricing changes do not require editing a large page component. Add tests around quantity, urgency, discounts, rounding, and zero selections.

### P1 — add a real quality gate

The README references a TypeScript check that is not present in `package.json`, and the current scripts do not provide a complete CI path. Add `typecheck`, make linting compatible with the installed Next version, and run build/typecheck/lint in CI before deployment.

Suggested minimum gate:

```text
npm ci
npm run typecheck
npm run lint
npm run build
```

### P1 — improve SEO and content integrity

- Verify that `/og-image.jpg` exists; the metadata currently references it but it is not present in the visible asset list.
- Replace generic empty image alt text where an image is meaningful, while retaining empty alt text for purely decorative images.
- Verify that Organization `sameAs` links match the actual social URLs used in navigation/contact.
- Add page-specific metadata for services, portfolio, case studies, and blog articles.
- Confirm that every portfolio project link resolves and that missing slugs return a deliberate 404.

### P2 — reduce client weight and maintenance cost

The homepage and contact experience contain large client components with animation, chat, quote logic, and form logic together. Split interactive islands into focused components and keep static sections server-rendered where possible. This should improve first load, simplify testing, and make future design changes safer.

### P2 — accessibility and UX polish

- Add explicit labels/descriptions and error associations to every form field.
- Ensure modals trap focus, close predictably, and announce success/failure to assistive technology.
- Respect `prefers-reduced-motion` for carousel and Framer Motion transitions.
- Add visible focus states to navigation, quote controls, carousel controls, and chat controls.
- Make email, phone, and address details on the contact page actual links where appropriate.

## Recommended delivery order

1. Secure and validate the contact API; remove sensitive logging and hard-coded fallbacks.
2. Remove broken links and reconcile quote/service coverage.
3. Establish typecheck/lint/build CI and add quote/API tests.
4. Fix metadata/assets and run a route/link audit.
5. Split large client components and complete accessibility/performance polish.

## Definition of a stronger release

The next release should be considered ready when contact submissions are safe under malformed and repeated requests, all visible links resolve, quote behavior is tested and aligned with the service catalog, CI passes typecheck/lint/build, metadata assets are present, and a mobile/accessibility pass confirms that the primary conversion journey works without animation or JavaScript surprises.

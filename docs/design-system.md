# Merit Graphics design system

This is the shared visual foundation for the website. It preserves Merit's orange and navy identity while making common elements consistent across pages.

## Foundations

- **Typography:** Poppins for display headings and Plus Jakarta Sans for body text and controls. Font families are configured in `tailwind.config.ts` and `src/app/globals.css`; both have system-font fallbacks.
- **Color:** Tailwind's `primary` scale supplies the Merit orange palette; `secondary` supplies navy. Gray surfaces and text support both light and dark themes. Use existing color tokens instead of adding page-specific brand colors.
- **Spacing:** Tailwind's spacing scale, the shared `container` width, and `.ds-section` provide responsive horizontal gutters and section spacing.
- **Icons:** Prefer existing Lucide, Heroicons, or brand icons. Use `.ds-icon-badge` for a 44px accent container and `.ds-icon-button` for a 44px circular icon action. Decorative icons should be hidden from assistive technology; icon-only links need accessible names.
- **Focus:** Shared buttons and icon buttons include visible keyboard focus styles. Form fields use the shared focus ring.

## Shared styles

The classes are defined in `src/app/globals.css` and can be used on existing HTML elements and Next.js links:

| Class | Use |
| --- | --- |
| `ds-section` | Responsive vertical section spacing |
| `ds-section-title`, `ds-section-intro` | Section heading and supporting copy |
| `ds-card`, `ds-card-hover` | Light/dark card surface and optional hover elevation |
| `ds-icon-badge`, `ds-icon-button` | Accent icon and circular icon action |
| `ds-field` | Inputs, select controls, and textareas |
| `btn-primary` | Main orange action |
| `btn-secondary` | Neutral secondary action |
| `btn-inverse` | Light action on a dark or colored surface |
| `btn-brand` | Orange-to-navy featured action |

Use layout utilities alongside these classes where a specific width or spacing is needed. Keep service-specific illustrations and content, while using shared controls, text, and surfaces.

## Where this first pass is applied

- **All pages using `MainLayout`:** navigation container and quote buttons, footer container and social icon buttons.
- **Home:** hero and featured-work actions, service section headings, spacing and cards, and the final contact action.
- **Quote form:** heading, introduction, icon badges, card, quantity field, and primary actions.
- **Services:** overview section, details card and actions; all five service detail pages use the Merit orange/navy accents and shared call-to-action buttons.
- **Portfolio:** project card surfaces and the contact action.
- **Blog:** heading, introductory copy, section spacing, and article cards.
- **Contact:** form card, fields, submit action, and success-modal close action.

This is a foundation and first adoption pass, not a claim that every component has been converted. Additional sections and page-specific components can adopt these classes as they are updated.

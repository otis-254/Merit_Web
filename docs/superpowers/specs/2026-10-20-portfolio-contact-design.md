# Portfolio and contact UI improvements

## Intent and scope

Improve discovery of Merit Graphics' work and make it easier for prospective clients to contact the team. Keep the existing orange and navy identity, typography, responsive layouts, dark mode and contact submission endpoint. Do not implement the separate site-wide animation and preloader request as part of this work.

## Portfolio

- Make all existing projects discoverable through accessible service-category filters, including web development, with an obvious selected state and a clear all-projects option.
- Give each project a visible title, description and service category on touch as well as desktop. Keep image previews distinct from links to the relevant service; do not imply that a service page is a case study.
- Provide a keyboard-accessible image viewer with a meaningful image description, a named close button, Escape-to-close, focus containment and focus restoration.
- Surface the existing case studies as a separate section linking to their actual routes. Reuse the existing descriptions without inventing project-to-client associations or new results.
- Preserve a clear contact call to action and make the layout usable on small screens.

## Contact

- Present the existing contact form beside a compact contact-information panel on desktop, stacking naturally on smaller screens.
- Turn the existing email and phone into `mailto:` and `tel:` links. Link the general Roysambu location to a map search without implying a specific street address.
- Replace placeholder social links with destinations already used in the site where appropriate; do not invent unverified accounts or link visitors to an admin dashboard.
- Make submitting, validation, success and failure states clear and accessible. Preserve entered values after a failed request, and do not report success when submission fails. Avoid making an unsupported response-time promise.
- Preserve the existing API contract; backend security and delivery changes remain outside this UI task.

## Verification

- Test category filtering, all-projects reset, accessible viewer open/close and keyboard focus, and case-study destinations.
- Test contact link destinations, form validation, pending, failure and success behavior without sending real customer messages.
- Verify desktop and mobile layouts, light and dark appearances, existing quote tests, and a production build. Preserve unrelated worktree changes and existing generated build artifacts.

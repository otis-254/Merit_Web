/**
 * Real client testimonials only.
 *
 * Every entry must come from something the client actually sent us — an email,
 * a WhatsApp message, a LinkedIn recommendation or a recorded video. Add the
 * proof (`proof`) where we have it: a WhatsApp screenshot in
 * `public/testimonials/`, or an MP4 in `public/videos/`.
 *
 * If there is nothing verified to show, leave the list empty. The homepage
 * hides the section rather than displaying invented quotes.
 */

export type TestimonialProof =
  | { type: 'screenshot'; src: string; alt: string }
  | { type: 'video'; src: string; poster?: string }

export type Testimonial = {
  id: string
  quote: string
  author: string
  role: string
  company: string
  /** Client logo, preferred over a headshot. */
  logo?: string
  /** Optional WhatsApp screenshot or video of the client saying it. */
  proof?: TestimonialProof
}

export const testimonials: Testimonial[] = []

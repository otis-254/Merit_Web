export type CaseStudy = {
  slug: string
  client: string
  title: string
  category: string
  logo?: string
  image: string
  summary: string
  problem: string
  whatWeDid: string[]
  result: string[]
  services: string[]
  timeline: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'islamic-relief-kenya-campaign',
    client: 'Islamic Relief Kenya',
    title: 'One campaign look across print, social and field banners',
    category: 'Campaign Design',
    logo: '/brands/islamic-relief-kenya.png',
    image: '/portfolio/Brand.jpg',
    summary:
      'Donation campaign materials were being produced by different people, so no two items looked related.',
    problem:
      'Appeal posters, social posts and field banners were made ad hoc by whoever was available. Colours, logo sizes and typefaces changed from item to item, so donors could not tell at a glance which materials were official.',
    whatWeDid: [
      'Set one campaign visual system: colour palette, type scale, logo placement rules and photo treatment.',
      'Designed the full kit — appeal posters, roll-up banners, social templates and printed flyers — from that single system.',
      'Handed over editable templates so the in-house team can produce new posts without redesigning anything.',
    ],
    result: [
      'Every campaign item is now visibly part of the same appeal, in print and online.',
      'New social posts are produced in-house from templates instead of being briefed out each time.',
    ],
    services: ['Brand Identity', 'Print Design', 'Social Media Design'],
    timeline: '3 weeks',
  },
  {
    slug: 'career-options-africa-brand-refresh',
    client: 'Career Options Africa',
    title: 'A brand refresh that reads as a serious regional recruiter',
    category: 'Brand Identity',
    logo: '/brands/career-options-africa.png',
    image: '/portfolio/Brand 02.jpg',
    summary:
      'The firm competes for corporate HR clients across East Africa, but its materials looked like a small local agency.',
    problem:
      'Proposals, profile documents and social content all used different layouts and stretched versions of the logo. For a firm pitching multinational employers, the paperwork undersold the work.',
    whatWeDid: [
      'Rebuilt the logo as a clean vector suite with correct spacing, colour and mono versions.',
      'Defined a document system: proposal covers, company profile, letterhead and slide master.',
      'Wrote a short brand guideline anyone in the team can follow without a designer in the room.',
    ],
    result: [
      'Client-facing proposals and profiles now go out in one consistent, corporate-grade format.',
      'No more stretched or low-resolution logos — one asset pack covers print, screen and signage.',
    ],
    services: ['Brand Identity', 'Print Design', 'Brand Guidelines'],
    timeline: '4 weeks',
  },
  {
    slug: 'nairobi-school-alumni-annual-report',
    client: 'Nairobi School',
    title: 'An annual report people actually read to the end',
    category: 'Print Design',
    logo: '/brands/nairobi-school.png',
    image: '/portfolio/Annual.png',
    summary:
      'A dense text report had to work for alumni, parents and sponsors in one document.',
    problem:
      'The previous report was wall-to-wall text with numbers buried in tables. Sponsors could not quickly see where funds went, and alumni skipped most of it.',
    whatWeDid: [
      'Restructured the content into a clear reading order: highlights, then financials, then programmes.',
      'Turned the key figures into charts and pull-out stats instead of raw tables.',
      'Designed the layout, art-directed the photography and prepared print-ready files for the printer.',
    ],
    result: [
      'The report now opens with the numbers sponsors ask about, on one spread.',
      'The layout is reusable, so each year is an update rather than a rebuild.',
    ],
    services: ['Print Design', 'Editorial Layout', 'Data Visualisation'],
    timeline: '5 weeks',
  },
  {
    slug: 'men-only-initiative-digital-launch',
    client: 'Men Only Initiative',
    title: 'From no online presence to a working launch kit',
    category: 'Brand + Web',
    logo: '/brands/men-only-initiative.png',
    image: '/portfolio/web-app.jpeg',
    summary:
      'A new mental-health initiative needed to look credible on day one, on a small budget.',
    problem:
      'The initiative had a name, a mission and nothing else — no logo, no colours, no site. Partners asked for a profile and there was nothing to send.',
    whatWeDid: [
      'Designed the identity: logo, colour palette, typography and a simple icon set.',
      'Built a responsive one-page site with the mission, programmes and a contact form that reaches WhatsApp and email.',
      'Produced a launch pack of social templates and a PDF partner profile.',
    ],
    result: [
      'Partner enquiries get a professional profile the same day instead of a holding reply.',
      'The team posts on a consistent template set without needing a designer each week.',
    ],
    services: ['Brand Identity', 'Web Development', 'Social Media Design'],
    timeline: '6 weeks',
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug)
}

export type CaseStudy = {
  id: string
  slug: string
  title: string
  category: string
  client: string
  type: 'image' | 'video'
  media: string
  summary: string
  problem: string
  approach: string
  result: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'islamic-relief-donor-materials',
    title: 'Donor Materials That Match on Every Channel',
    category: 'Brand & Print',
    client: 'Islamic Relief Kenya',
    type: 'image',
    media: '/portfolio/islamic-relief-code-of-conduct.jpg',
    summary:
      'Unified brochures, reports, and campaign artwork so field and HQ teams speak with one visual voice.',
    problem:
      'Campaign artwork, brochures, and social graphics had drifted over years—different colours, type, and photo styles. Donor reports looked unrelated to what appeared online, and staff spent time fixing layouts before printing.',
    approach:
      'We audited existing materials, tightened the colour and typography system, and redesigned core templates (brochure, one-pager, report cover, social sizes). Files were delivered in editable and print-ready formats with a short usage guide for non-designers.',
    result:
      'Teams reuse the same master files for new campaigns. Print turnaround is faster because specs are set, and public-facing materials now read as one organisation across print and digital.',
  },
  {
    id: '2',
    slug: 'career-options-africa-brand-profile',
    title: 'A Profile Worth Sending to Partners',
    category: 'Brand Identity & Professional Pitch',
    client: 'Zigo Trace',
    type: 'image',
    media: '/portfolio/Zigo-trust.jpeg',
    summary:
      'Logo refinement, company profile, and presentation templates for regional partnership meetings.',
    problem:
      'The organisation was growing into new markets but still relied on an outdated Word-based profile that looked inconsistent in PDF and on screen. Pitch meetings needed a cohesive deck and leave-behind.',
    approach:
      'We refined the mark for small sizes, defined primary and secondary colours, and built a 16-page company profile with photography treatment and infographics. PowerPoint/Google Slides masters were included for future edits.',
    result:
      'Partners received a single, polished PDF and matching deck. Internal staff update copy without breaking layout, and the brand reads confidently in both print and email attachments.',
  },
  {
    id: '3',
    slug: 'nairobi-school-communications',
    title: 'Technology Hub Marketing Collaterals Ready for Print and Social Use',
    category: 'Print Design',
    client: 'Robotech Innovators',
    type: 'image',
    media: '/portfolio/Robotech.jpg',
    summary:
      'We designed, formated, and delivered print-ready publication layouts and rapid-turnaround digital templates for the Robotech Innovators events and notice.',
    problem:
      'Robotech Innovators came to us with a blank canvas—needing high-impact marketing materials for their publications, events, and notices, but lacking any initial design concepts, visual direction, or internal creative expertise to translate their technical programs into appealing visuals under tight timelines.',
    approach:
      'Taking full creative ownership, our agency spearheaded the visual identity from concept to final delivery. We conceptualized dynamic, tech-forward design systems from scratch—blending modern typography, futuristic brand accents, and clean grid layouts—and built a suite of print-ready publication layouts alongside plug-and-play event and notice templates. By turning their abstract need into a cohesive, high-energy visual brand, we transformed raw content into captivating, market-ready assets with rapid turnaround times.',
    result:
      '100% On-Time Delivery: Successfully launched all print materials—including annual publication layouts, brochures, flyers, roll-up banners, t-shirts, business cards, name tags and handbills—ahead of event deadlines without sacrificing quality.',
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug)
}

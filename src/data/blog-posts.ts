export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'callout'; text: string }

export type BlogPost = {
  slug: string
  title: string
  description: string
  category: string
  readTimeMinutes: number
  publishedAt: string
  coverImage: string
  blocks: BlogBlock[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'logo-cost-kenya-2026',
    title: 'How Much Does a Logo Cost in Kenya? (2026 Price Guide)',
    description:
      'Realistic logo pricing in Kenya—from quick marks to full brand-ready packages—and what you should expect at each level.',
    category: 'Pricing',
    readTimeMinutes: 3,
    publishedAt: '2026-01-15',
    coverImage: '/portfolio/Brand.jpg',
    blocks: [
      {
        type: 'p',
        text: 'If you are searching for logo design prices in Nairobi or anywhere in Kenya, you will see quotes from KSh 2,000 to KSh 150,000 for what sounds like the same thing. The gap is usually not about “better Photoshop”—it is about strategy, revisions, file quality, and whether you are buying a picture or a brand tool you can use for years.',
      },
      { type: 'h2', text: 'Quick answer: typical logo price ranges in Kenya (2026)' },
      {
        type: 'ul',
        items: [
          'KSh 3,000 – KSh 8,000: Very low-cost / template-style logos. Often one concept, limited revisions, JPG/PNG only. Risky for registered businesses.',
          'KSh 8,000 – KSh 25,000: Freelance or small-studio logo jobs. Usually 2–3 concepts, vector files (AI/EPS/SVG), basic colour versions.',
          'KSh 25,000 – KSh 60,000: Professional logo with discovery, competitor review, and brand-ready export kit (print + digital specs).',
          'KSh 60,000 – KSh 120,000+: Logo as part of a brand identity system—typography, colour rules, mockups, and usage guidelines.',
        ],
      },
      {
        type: 'callout',
        text: 'Tip: Ask for vector source files and a simple one-page “how to use my logo” guide. If those are not included, budget extra later—or pay twice when you rebrand.',
      },
      { type: 'h2', text: 'What actually drives the price?' },
      { type: 'h3', text: '1. Number of concepts and revision rounds' },
      {
        type: 'p',
        text: 'More exploration takes more designer time. A fair package usually includes a defined number of initial directions (often 2–3) and 2–3 revision rounds on the chosen direction—not unlimited “small tweaks” forever.',
      },
      { type: 'h3', text: '2. Research and strategy' },
      {
        type: 'p',
        text: 'Logos for a school, NGO, fintech app, or restaurant should not look the same. Designers who interview you, review competitors, and test legibility at small sizes charge more because the mark is built to work—not just to look nice in a portfolio.',
      },
      { type: 'h3', text: '3. Deliverables (files you receive)' },
      {
        type: 'ul',
        items: [
          'Minimum you need: vector logo (AI/EPS/SVG), PNG with transparent background, full-colour and single-colour versions.',
          'Nice to have: favicon, social profile crops, letterhead mockup, clear space and minimum size rules.',
          'Red flag: JPG-only delivery or “I will send later” source files.',
        ],
      },
      { type: 'h3', text: '4. Rights and ownership' },
      {
        type: 'p',
        text: 'In Kenya, confirm in writing that you own the final logo after full payment. Some cheap offers license artwork instead of transferring rights, which causes problems when you register a business name or trademark.',
      },
      { type: 'h2', text: 'Logo vs. full brand identity: which do you need?' },
      {
        type: 'p',
        text: 'Choose a standalone logo if you are testing an idea, need a mark quickly for an event, or already have brand colours and fonts. Choose brand identity if customers will see you on signage, uniforms, proposals, and social media every week—inconsistent visuals cost trust.',
      },
      { type: 'h2', text: 'How to compare quotes fairly' },
      {
        type: 'ul',
        items: [
          'Same brief: industry, audience, where the logo will appear (sign, app icon, embroidery).',
          'Same deliverable list: file formats, colour versions, revision count, timeline.',
          'Same ownership terms: full transfer after payment.',
          'Portfolio fit: have they designed for organisations like yours?',
        ],
      },
      {
        type: 'p',
        text: 'Merit Graphics typically starts logo work from around KSh 5,000 for simple marks and scales with concepts, research, and brand kits. Use our instant quote tool on the contact page for a range based on your scope—or WhatsApp us with your timeline and we will recommend a sensible package.',
      },
    ],
  },
  {
    slug: 'website-cost-kenya-breakdown',
    title: 'How Much Does a Website Cost in Kenya? A Simple Breakdown',
    description:
      'Understand website pricing tiers in Kenya: one-page sites, business websites, e-commerce, and what maintenance really costs.',
    category: 'Pricing',
    readTimeMinutes: 4,
    publishedAt: '2026-02-03',
    coverImage: '/portfolio/website.png',
    blocks: [
      {
        type: 'p',
        text: 'Website prices in Kenya range from a few thousand shillings for a template on shared hosting to hundreds of thousands for custom platforms. The useful question is not “cheapest site” but “what job must this website do for my business?”',
      },
      { type: 'h2', text: 'Common website types and 2026 price ranges' },
      { type: 'h3', text: 'One-page / landing page' },
      {
        type: 'p',
        text: 'Best for: single offer, event, or lead capture. Typical range: KSh 15,000 – KSh 45,000 including mobile layout, contact form or WhatsApp button, and basic SEO setup.',
      },
      { type: 'h3', text: 'Small business website (5–8 pages)' },
      {
        type: 'p',
        text: 'Best for: schools, clinics, NGOs, professional services. Typical range: KSh 35,000 – KSh 120,000 depending on custom design, copy support, galleries, and integrations.',
      },
      { type: 'h3', text: 'E-commerce / online shop' },
      {
        type: 'p',
        text: 'Best for: retail with M-Pesa/card checkout, inventory, and delivery workflows. Typical range: KSh 80,000 – KSh 350,000+ depending on product count, payment gateways, and admin training.',
      },
      { type: 'h3', text: 'Web application / portal' },
      {
        type: 'p',
        text: 'Best for: dashboards, booking systems, member portals. Priced by features; expect phased quotes after a discovery session.',
      },
      { type: 'h2', text: 'What is included in a fair website quote?' },
      {
        type: 'ul',
        items: [
          'Design: mobile-first layouts, readable typography, on-brand colours.',
          'Development: fast hosting setup guidance, SSL, contact forms, analytics hookup.',
          'Content: who writes copy and who supplies photos?',
          'Training: can you update text yourself?',
          'Launch support: testing on common phones and browsers used in Kenya.',
        ],
      },
      { type: 'h2', text: 'Ongoing costs people forget' },
      {
        type: 'ul',
        items: [
          'Domain: roughly KSh 1,000 – KSh 3,000 per year depending on extension (.co.ke, .com, etc.).',
          'Hosting: KSh 3,000 – KSh 25,000+ per year based on traffic and email needs.',
          'Maintenance: security updates, backups, small content changes—budget monthly or per ticket.',
          'Marketing: Google Business Profile, basic SEO, and social links are not automatic traffic.',
        ],
      },
      {
        type: 'callout',
        text: 'Most Kenyan visitors will open your site on mobile data. Prioritise speed, clear phone/WhatsApp actions, and simple navigation over heavy animation.',
      },
      { type: 'h2', text: 'Red flags when comparing developers' },
      {
        type: 'ul',
        items: [
          'No contract or scope document.',
          'You do not receive admin access or source code ownership.',
          '“Free hosting forever” with no explanation of renewal costs.',
          'No mention of SSL, backups, or what happens after launch.',
        ],
      },
      {
        type: 'p',
        text: 'At Merit Graphics, we quote websites after a short call about pages, features, and content readiness. Our contact page quote calculator gives a starting range for standard business sites—then we refine it to match your exact needs.',
      },
    ],
  },
  {
    slug: 'best-design-small-budget-kenya',
    title: 'How to Get the Best Design on a Small Budget in Kenya',
    description:
      'Practical ways startups and SMEs can look professional without overspending—priorities, phasing, and smart briefs.',
    category: 'Guides',
    readTimeMinutes: 3,
    publishedAt: '2026-02-18',
    coverImage: '/portfolio/social-media.jpg',
    blocks: [
      {
        type: 'p',
        text: 'A small budget does not have to mean a cheap-looking brand. It means being ruthless about priorities, preparing well, and buying design in phases instead of trying to do everything at once.',
      },
      { type: 'h2', text: 'Start with the one thing customers see first' },
      {
        type: 'p',
        text: 'For many Kenyan businesses, that is WhatsApp status, Instagram, or a signboard—not a 40-page brand book. Invest first in a solid logo export kit and three templates: social post, price list or flyer, and a simple profile PDF you can send to clients.',
      },
      { type: 'h2', text: 'Write a brief even if it is one page' },
      {
        type: 'ul',
        items: [
          'What you sell and who buys it (be specific: “women 25–40 in Nairobi” beats “everyone”).',
          'Three brands you like and one you do not—explain why.',
          'Where designs will live: sign, uniform, M-Pesa till sticker, website header.',
          'Deadline and budget range (designers can tailor scope when they know both).',
        ],
      },
      { type: 'h2', text: 'Phase your brand instead of buying “everything”' },
      { type: 'h3', text: 'Phase 1 — Essentials' },
      {
        type: 'ul',
        items: ['Logo + colour + font pairing', 'Business card and digital letterhead', 'Social template pack'],
      },
      { type: 'h3', text: 'Phase 2 — Growth' },
      {
        type: 'ul',
        items: ['Website or landing page', 'Packaging or signage', 'Pitch deck / company profile'],
      },
      { type: 'h3', text: 'Phase 3 — Scale' },
      {
        type: 'ul',
        items: ['Full brand guidelines', 'Campaign creative retainer', 'Photo/video production'],
      },
      { type: 'h2', text: 'Save money without cutting corners' },
      {
        type: 'ul',
        items: [
          'Provide your own photos when possible—phone photos in good light beat stock images.',
          'Reuse layouts: one strong poster system beats ten one-off designs.',
          'Limit revision rounds by deciding internally before sending feedback.',
          'Ask for print-ready specs once and reuse them with your printer.',
        ],
      },
      {
        type: 'callout',
        text: 'The most expensive design is the one you replace in six months because files were wrong or the mark never worked on a sign.',
      },
      { type: 'h2', text: 'When to spend more upfront' },
      {
        type: 'p',
        text: 'Spend more if you are registering a company, pitching to investors, opening a physical shop, or running paid ads—weak creative burns ad budget. In those cases, a modest brand identity package often pays for itself in trust and conversion.',
      },
      {
        type: 'p',
        text: 'Merit Graphics offers startup-friendly packages and clear scopes so you know exactly what is in and what can wait. Tell us your budget honestly—we will suggest a phased plan that still looks intentional.',
      },
    ],
  },
  {
    slug: 'starting-business-kenya-branding-checklist',
    title: 'Starting a Business in Kenya? The 5 Branding Things You Need First',
    description:
      'Before you print banners or boost posts on Facebook, Instagram, or Tiktok, lock these five branding basics so your business looks credible from day one and save money.',
    category: 'Checklists',
    readTimeMinutes: 3,
    publishedAt: '2026-03-01',
    coverImage: '/portfolio/Business.png',
    blocks: [
      {
        type: 'p',
        text: 'New businesses in Kenya often rush to print cheap flyers before they have a clear name, logo files, or consistent colours. These five steps save money and embarrassment later.',
      },
      { type: 'h2', text: '1. A name that works online and on a sign' },
      {
        type: 'p',
        text: 'Check domain and social handle availability early. Short, easy-to-spell names win on M-Pesa paybills, Google search, and word-of-mouth. Avoid special characters that break on keyboards.',
      },
      { type: 'h2', text: '2. A logo you can actually use' },
      {
        type: 'ul',
        items: [
          'Vector files for printers and sign makers.',
          'PNG with transparent background for social media.',
          'Light and dark background versions.',
          'Simple icon or monogram for app icons and avatars.',
        ],
      },
      { type: 'h2', text: '3. Two fonts and two colours (not twelve)' },
      {
        type: 'p',
        text: 'Pick one heading font and one body font. Choose a primary brand colour plus a neutral (dark grey or off-white). Consistency makes free tools like Canva look professional when you DIY urgent posts.',
      },
      { type: 'h2', text: '4. A one-page brand sheet for your team' },
      {
        type: 'p',
        text: 'Document logo spacing, wrong vs. right usage, hex codes, and approved photos. Share it on WhatsApp with anyone who posts for you—staff, interns, or agencies.',
      },
      { type: 'h2', text: '5. Customer touchpoints in order' },
      {
        type: 'ul',
        items: [
          'WhatsApp Business profile photo and catalog cover using your logo.',
          'Google Business Profile with matching photos and hours.',
          'Simple landing page or link-in-bio with services, location, and contact.',
          'Printed essentials: business card or receipt branding as budget allows.',
        ],
      },
      {
        type: 'callout',
        text: 'Register your business name with the relevant authorities and align it with your brand before you print large signage—it is cheaper than repainting.',
      },
      { type: 'h2', text: 'What can wait until you have sales?' },
      {
        type: 'ul',
        items: [
          'Full merchandise line',
          'Expensive video shoots',
          'Complex custom web apps',
          'Large-format billboards before you know your message converts',
        ],
      },
      {
        type: 'p',
        text: 'Merit Graphics helps new Kenyan businesses package these five essentials quickly—logo kit, profile PDF, social templates, and optional website. Book a free consultation on our contact page and we will map a sensible first 30 days.',
      },
    ],
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export type BlogPostMeta = {
  slug: string
  title: string
  description: string
  category: string
  readTimeMinutes: number
  publishedAt: string
  coverImage: string
}

/** Listing-only metadata — keeps heavy article bodies out of the home page client bundle. */
export const blogPostMeta: BlogPostMeta[] = [
  {
    slug: 'logo-cost-kenya-2026',
    title: 'How Much Does a Logo Cost in Kenya? (2026 Price Guide)',
    description:
      'Realistic logo pricing in Kenya—from quick marks to full brand-ready packages—and what you should expect at each level.',
    category: 'Pricing',
    readTimeMinutes: 4,
    publishedAt: '2026-01-15',
    coverImage: '/portfolio/Brand.jpg',
  },
  {
    slug: 'website-cost-kenya-breakdown',
    title: 'How Much Does a Website Cost in Kenya? A Simple Breakdown',
    description:
      'Understand website pricing tiers in Kenya: one-page sites, business websites, e-commerce, and what maintenance really costs.',
    category: 'Pricing',
    readTimeMinutes: 3,
    publishedAt: '2026-02-03',
    coverImage: '/portfolio/web-app.jpeg',
  },
  {
    slug: 'best-design-small-budget-kenya',
    title: 'How to Get the Best Design on a Small Budget in Kenya',
    description:
      'Practical ways startups and SMEs can look professional without overspending—priorities, phasing, and smart briefs.',
    category: 'Guides',
    readTimeMinutes: 4,
    publishedAt: '2026-02-18',
    coverImage: '/portfolio/social-media.jpg',
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
  },
]

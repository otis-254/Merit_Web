export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; text: string }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  image: string
  content: BlogBlock[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'starting-a-business-in-kenya-branding-checklist',
    title: 'Starting a Business in Kenya? The 5 Branding Things You Need First',
    excerpt:
      'Before you print a single banner, get these five things right. They cost little, take about a week, and save you from rebranding in year two.',
    date: '2025-09-15',
    readTime: '5 min read',
    category: 'Branding',
    image: '/portfolio/Brand.jpg',
    content: [
      {
        type: 'p',
        text: 'Most new businesses in Kenya start branding backwards. The logo gets designed on day one, the banner is printed on day three, and by month six the name has changed, the colours have changed, and the banner is behind the shop counter gathering dust.',
      },
      {
        type: 'p',
        text: 'Here is the order that actually works. Five things, roughly a week of effort, and you will not need to redo them.',
      },
      { type: 'h2', text: '1. A name you can legally own' },
      {
        type: 'p',
        text: 'Search and reserve the name through eCitizen (Business Registration Service) before you spend anything on design. Then check two more places: whether the .co.ke domain is free, and whether the Instagram and Facebook handles are free. A name that is available at BRS but taken on every social platform will cost you customers who cannot find you.',
      },
      {
        type: 'callout',
        text: 'Rule of thumb: if you cannot get the domain and a matching social handle, pick another name. Changing it later is far more expensive than choosing again today.',
      },
      { type: 'h2', text: '2. A logo in the right file formats' },
      {
        type: 'p',
        text: 'The logo matters less than most people think — what matters is getting files you can actually use. A JPG pulled off WhatsApp will look blurry on a signboard and cannot be printed on a branded t-shirt.',
      },
      {
        type: 'p',
        text: 'Ask your designer for the following, and do not accept a single JPG:',
      },
      {
        type: 'ul',
        items: [
          'Vector source files (AI, EPS or SVG) — these scale from a business card to a building wrap.',
          'PNG with a transparent background, for social and documents.',
          'A one-colour (black and white) version, for stamps, receipts and cheap printing.',
          'A horizontal version and a square version — the square one is your profile picture.',
        ],
      },
      { type: 'h2', text: '3. Two colours and two fonts. Written down.' },
      {
        type: 'p',
        text: 'You do not need a 40-page brand book. You need a single page that says: these are my two colours (with the exact hex and CMYK codes), this is my heading font, this is my body font. Give that page to every printer, designer and intern who touches your brand.',
      },
      {
        type: 'p',
        text: 'This one page is why some small businesses look consistent everywhere while others look like five different companies. Without it, every printer in town picks a slightly different red and you never notice until the banners stand next to each other.',
      },
      { type: 'h2', text: '4. One contact point that never changes' },
      {
        type: 'p',
        text: 'Customers in Kenya will reach you on WhatsApp. Set up WhatsApp Business properly on a line you will keep: business name, catalogue, working hours and an away message. Put that same number on the logo lockup, the banner, the car branding and the Google listing.',
      },
      {
        type: 'ul',
        items: [
          'Use a business line, not the personal number you might change.',
          'Make the M-Pesa till or paybill name match the business name exactly — mismatches make customers hesitate before paying.',
          'Claim your free Google Business Profile the same week. It is the difference between showing up on Maps and being invisible.',
        ],
      },
      { type: 'h2', text: '5. A basic template set for the things you send out' },
      {
        type: 'p',
        text: 'Before you think about a website, get templates for the documents you will actually use in month one: a quotation, an invoice, a WhatsApp/Instagram post, and a company profile PDF. These are what clients judge you on when they are deciding whether to pay a deposit.',
      },
      {
        type: 'p',
        text: 'A tidy quotation with your logo and colours on it wins work against a competitor who sends a figure in a WhatsApp text. That is the whole game early on.',
      },
      { type: 'h2', text: 'The order, in one line' },
      {
        type: 'ol',
        items: [
          'Reserve the name (and the domain and handles).',
          'Get the logo in proper file formats.',
          'Write down two colours and two fonts.',
          'Set up WhatsApp Business, M-Pesa and Google Business Profile with matching details.',
          'Get quotation, invoice, social and profile templates.',
        ],
      },
      {
        type: 'p',
        text: 'The website, the brochure and the branded merchandise all come after. Do these five first and everything you build later will fit together.',
      },
    ],
  },
  {
    slug: 'how-much-should-a-logo-cost-in-kenya',
    title: 'How Much Should a Logo Cost in Kenya? An Honest Guide',
    excerpt:
      'Quotes range from KSh 1,500 to KSh 150,000 for what looks like the same thing. Here is what actually separates them.',
    date: '2025-09-05',
    readTime: '4 min read',
    category: 'Pricing',
    image: '/portfolio/Brand 02.jpg',
    content: [
      {
        type: 'p',
        text: 'Ask five designers in Nairobi what a logo costs and you will get five very different numbers. The confusing part is that the cheap one and the expensive one both send you a picture of a logo. The difference is in what comes with it — and what happens six months later.',
      },
      { type: 'h2', text: 'What you get at each price level' },
      {
        type: 'ul',
        items: [
          'Under KSh 5,000: usually one person, one idea, and a JPG. Often a stock icon with your name next to it. Fine for a side hustle, a problem the day you need a signboard or a stamp.',
          'KSh 10,000 – 40,000: a few concepts, a couple of revision rounds, and proper vector files. This is where most serious small businesses land.',
          'KSh 50,000 and above: research into your market, naming and positioning input, a full identity system (colours, fonts, templates, guidelines) rather than just a mark.',
        ],
      },
      { type: 'h2', text: 'The questions that decide the price' },
      {
        type: 'ol',
        items: [
          'How many concepts and revision rounds are included? Unlimited revisions usually means the price is padded already.',
          'Do you get the vector source files, or only exports? If you do not own the source, you are tied to that designer forever.',
          'Is a one-colour version included? You will need it for stamps, receipts and embroidery.',
          'Is there a written guideline page? Without it, consistency dies the moment someone else designs a poster.',
          'Who owns the copyright after payment? Get it in writing that you do.',
        ],
      },
      {
        type: 'callout',
        text: 'A cheap logo is not the one that costs KSh 3,000. It is the one you have to pay for again in eighteen months, after reprinting all your signage.',
      },
      { type: 'h2', text: 'Where you should not economise' },
      {
        type: 'p',
        text: 'Spend on the file formats and the one-page guideline, even if you keep the concept work lean. Those two things are what make a logo usable across a signboard, a delivery van, an Instagram avatar and a receipt without re-drawing anything.',
      },
      { type: 'h2', text: 'Where you can' },
      {
        type: 'p',
        text: 'You do not need a 40-page brand book on day one. You do not need three "brand territories" presented over two weeks. If a studio is quoting you six figures for a five-person business, ask them to show you which line items directly help you sell this year.',
      },
    ],
  },
  {
    slug: 'website-or-instagram-kenyan-small-business',
    title: 'Do You Need a Website, or Is Instagram Enough?',
    excerpt:
      'A straight answer for Kenyan small businesses — including the three cases where skipping a website costs you real money.',
    date: '2025-08-22',
    readTime: '4 min read',
    category: 'Web',
    image: '/portfolio/web-app.jpeg',
    content: [
      {
        type: 'p',
        text: 'Plenty of businesses in Kenya run entirely on Instagram and WhatsApp and do well. So the honest answer is: sometimes Instagram is enough. But there are three situations where it quietly costs you money.',
      },
      { type: 'h2', text: 'Case 1: You sell to other businesses or institutions' },
      {
        type: 'p',
        text: 'A procurement officer at a school, an NGO or a bank will look you up before shortlisting you. If the only thing they find is a social page, you will lose to the competitor with a site, a profile PDF and a domain email address. The email address alone matters: info@yourbusiness.co.ke reads differently to yourbusiness254@gmail.com.',
      },
      { type: 'h2', text: 'Case 2: People search for what you sell' },
      {
        type: 'p',
        text: 'If customers type "printing services Roysambu" or "wedding cakes Nairobi" into Google, a website plus a Google Business Profile puts you in front of them at the exact moment they are ready to buy. Instagram does not appear in those searches in any reliable way.',
      },
      { type: 'h2', text: 'Case 3: You repeat the same answers all day' },
      {
        type: 'p',
        text: 'If your DMs are the same five questions — price, location, delivery, lead time, payment — a simple site with prices and a booking form pays for itself in time saved.',
      },
      { type: 'h2', text: 'When Instagram really is enough' },
      {
        type: 'ul',
        items: [
          'Your product is visual and impulse-bought: fashion, food, beauty, décor.',
          'Your customers are individuals, not institutions.',
          'Discovery happens through reels, referrals and WhatsApp statuses, not search.',
        ],
      },
      {
        type: 'callout',
        text: 'If that is you, do not spend KSh 80,000 on a site. Spend it on photography and a month of consistent content instead.',
      },
      { type: 'h2', text: 'The middle option most people miss' },
      {
        type: 'p',
        text: 'You do not have to choose between nothing and a full e-commerce build. A good one-page site — what you do, proof of work, prices or price ranges, and a WhatsApp button — covers the three cases above. It can be live in a week, and it gives Google and procurement officers something to find.',
      },
      {
        type: 'p',
        text: 'Keep posting on Instagram either way. The site is where people land when they are ready to decide.',
      },
    ],
  },
]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

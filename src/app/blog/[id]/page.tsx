'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MainLayout } from '@/components/layout/main-layout'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const articles = [
  {
    id: 1,
    title: '2026 Kenyan Branding Trends: What Local Businesses Need to Know',
    category: 'branding',
    excerpt: 'From street art-inspired palettes to hyper-local storytelling, explore 2026 Kenyan branding trends that help local businesses dominate markets from Mombasa to Kisumu.',
    image: '/portfolio/Brand.jpg',
    author: {
      name: 'Caleb Otis',
      role: 'Creative Director',
      image: '/team/Team 01.jpeg',
    },
    date: '2026-06-20',
    readTime: '10 min read',
    content: `
      <h2>Introduction</h2>
      <p>Kenya's vibrant capital and East Africa's business hub, Nairobi, is at the forefront of a branding transformation in 2026—but these trends are spreading across the entire country. As local businesses from matatu saccos in Mombasa to tech startups in Kisumu compete for attention, Kenyan-specific branding trends are emerging that blend cultural authenticity with global digital standards. This article breaks down the top Kenyan branding trends for 2026, how Merit Graphics is implementing them, and actionable steps for Kenyan businesses to adopt these strategies.</p>
      
      <h2>1. Maasai-Inspired Color Palettes with Modern Minimalism</h2>
      <p>One of the biggest Kenyan branding trends for 2026 is the fusion of bold Maasai shuka colors (crimson, electric blue, tangerine) with clean, minimalist layouts. Kenyan fashion and lifestyle brands are leading this trend, moving away from generic Western palettes to something instantly recognizable as Kenyan.</p>
      <p>For example, local organic skincare brand Kenya Glow recently rebranded with a Maasai blue and red color system, paired with a simple sans-serif font, and saw a 40% increase in Instagram engagement and a 25% boost in in-store sales at their Sarit Center location and their new Mombasa branch.</p>
      <p><strong>How to implement:</strong> Work with a Kenyan branding agency (like Merit Graphics) to select culturally appropriate color combinations, and pair them with 1-2 neutral colors (off-white, charcoal) to keep your brand versatile for both digital and print use.</p>

      <h2>2. Hyper-Local Storytelling Rooted in Kenyan Communities</h2>
      <p>2026 is the year of hyper-local storytelling in Kenya. From Kibera's creative collectives to Kisumu's lakeside businesses, companies are tying their brand identity to specific Kenyan communities to build deeper connections.</p>
      <p>Take Nyama Mama Grill, a popular restaurant chain that recently launched a "Kenyan Neighborhoods" campaign, highlighting ingredients from local markets (Gikomba, Toi, Kisumu's Jua Kali Market) and featuring stories of their staff's home areas on their packaging and social media. The result? A 30% increase in repeat customers and features in both local (Nation, Standard) and international (CNN Travel) media.</p>
      <p><strong>SEO Tip for Kenyan Businesses:</strong> Include Kenyan location keywords in your website copy and social media posts (e.g., "best graphic design in Westlands", "Nairobi CBD branding services", "Mombasa print shop") to improve local search visibility.</p>

      <h2>3. Digital-First Brand Systems Optimized for M-Pesa and Social Commerce</h2>
      <p>With over 30 million M-Pesa users in Kenya and social commerce booming on Instagram and TikTok, Kenyan brands in 2026 are designing their entire brand systems for mobile-first, transactional experiences. This means:</p>
      <ul>
        <li>Simplified logos that scale perfectly on M-Pesa paybill screens</li>
        <li>Product packaging with scannable QR codes linking directly to Instagram Shops</li>
        <li>Brand voice guidelines optimized for Kenyan SMS and WhatsApp marketing</li>
      </ul>
      <p>Merit Graphics recently worked with Kenya Fresh Produce, a fruit and vegetable delivery service operating in Nairobi, Mombasa, and Kisumu, to create a brand system that reduced checkout time on their WhatsApp platform by 50% and increased order volume by 35%.</p>

      <h2>4. Swahili-Language Branding as a Competitive Advantage</h2>
      <p>While English has long been Kenya's business language, 2026 is seeing a surge in Swahili-first (or bilingual) branding across the country. This isn't just translation—it's about crafting brand names, slogans, and content that resonate culturally with Swahili speakers across Kenya and East Africa.</p>
      <p>For example, Kilimanjaro Coffee Roasters changed their primary slogan from "Kenya's Best Coffee" to "Kahawa ya Kenya, Kwa Nafsi Yako" (Kenyan Coffee, For Your Soul) and added Swahili product descriptions, resulting in a 45% increase in sales to coastal and upcountry customers.</p>

      <h2>Conclusion</h2>
      <p>2026 Kenyan branding trends are all about balancing global design standards with deep Kenyan authenticity. Whether you're a startup in Ngong Road or an established business in Industrial Area, or a small business in Eldoret or Malindi, adopting these trends can help your brand stand out in Kenya's crowded market and expand to other East African cities like Kampala and Dar es Salaam.</p>
      <p>If you're ready to update your brand for 2026, contact Merit Graphics today for a free 30-minute branding consultation tailored for Kenyan businesses.</p>
    `,
  },
  {
    id: 2,
    title: 'Print Design in Kenya: Elevating Local Businesses with High-Quality Materials',
    category: 'print',
    excerpt: 'Why print design still dominates Kenyan business in 2026—from premium business cards for CBD professionals to vibrant banners for Gikomba traders—and how to choose the right materials for your Kenyan brand.',
    image: '/portfolio/Annual.png',
    author: {
      name: 'Grace Nafula',
      role: 'Senior Designer',
      image: '/team/Team 02.jpeg',
    },
    date: '2026-06-15',
    readTime: '12 min read',
    content: `
      <h2>Introduction</h2>
      <p>Despite Kenya's rapid digital adoption—with over 90% of Kenyan residents using smartphones—print design remains a critical investment for local businesses in 2026. From street-side kiosks in Eastleigh to corporate offices in Upper Hill, and from Mombasa's Old Town to Kisumu's CBD, high-quality print materials help Kenyan brands build trust, drive foot traffic, and complement digital marketing efforts. This comprehensive guide explores print design best practices specific to Kenya's market, top materials for Kenyan conditions, and real success stories from Merit Graphics clients.</p>
      
      <h2>Why Print Still Wins in Kenya's Market</h2>
      <p>While social media drives awareness for many Kenyan businesses, print design closes sales and builds long-term loyalty. Here are three Kenyan-specific reasons print is non-negotiable in 2026:</p>
      <ol>
        <li><strong>Market Day Impact:</strong> For businesses selling in Gikomba, Toi, Kariokor, or Mombasa's Kongowea Market, vibrant banners and flyers cut through the noise and attract customers who might not be scrolling social media.</li>
        <li><strong>Corporate Credibility:</strong> In Nairobi's Central Business District, Mombasa's CBD, or Kisumu's city center, a premium business card or company brochure signals professionalism to potential clients, investors, and partners.</li>
        <li><strong>M-Pesa Integration:</strong> Modern print materials in Kenya now include QR codes linking directly to M-Pesa paybills, Till Numbers, or WhatsApp Business accounts, creating a seamless offline-to-online customer journey.</li>
      </ol>

      <h2>Top Print Materials for Kenyan Businesses (2026 Update)</h2>
      <h3>1. Premium Business Cards for Kenyan Professionals</h3>
      <p>Gone are the days of flimsy, generic business cards in Kenya. 2026 trends include:</p>
      <ul>
        <li>Matte laminate with spot UV accents for a luxurious feel</li>
        <li>Thick 350-400 GSM cardstock that stands up to Kenya's humidity</li>
        <li>Dual-sided design with English on one side and Swahili on the other</li>
        <li>QR codes linking to WhatsApp Business or LinkedIn profiles</li>
      </ul>
      <p>Merit Graphics worked with Nairobi Tech Consultants to redesign their business cards, and they reported a 60% increase in follow-up meetings after distributing the new cards at a Westlands tech conference and a Mombasa tech summit.</p>

      <h3>2. Weather-Resistant Banners for Outdoor Promotion</h3>
      <p>Kenya's weather—from intense sun to occasional rain—requires durable banner materials. In 2026, the top choices are:</p>
      <ul>
        <li><strong>PVC Flex Banners:</strong> Affordable, waterproof, and perfect for market stalls and road-side promotions</li>
        <li><strong>Mesh Banners:</strong> Great for high-wind areas like parts of Ngong Road and the Kenyan coast</li>
        <li><strong>Vinyl Stickers:</strong> Versatile for branding matatus, delivery motorcycles, and shop windows</li>
      </ul>
      <p>Uthiru Furniture, a local furniture maker with showrooms in Nairobi and Eldoret, invested in Merit Graphics-designed PVC banners and saw a 40% increase in walk-in customers within the first month.</p>

      <h3>3. Premium Brochures and Product Catalogs</h3>
      <p>For Kenyan businesses in tourism, real estate, or manufacturing, high-quality brochures and catalogs are essential sales tools. 2026 best practices include:</p>
      <ul>
        <li>Using local Kenyan imagery (Nairobi skyline, national parks, coastal beaches, lakeside scenes) to build connection</li>
        <li>Including pricing in Kenyan Shillings (KES) with clear M-Pesa payment details</li>
        <li>Offering digital PDF versions alongside print copies for easy sharing on WhatsApp</li>
      </ul>

      <h2>How to Choose a Kenyan Print Partner</h2>
      <p>Not all Kenyan printing companies are created equal. When selecting a partner, look for:</p>
      <ul>
        <li>Experience working with Kenyan businesses and understanding local market needs</li>
        <li>In-house design services (like Merit Graphics) to ensure your print materials match your digital brand</li>
        <li>Fast turnaround times—critical for Kenya's fast-paced business environment</li>
        <li>Competitive pricing without sacrificing quality</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Print design is alive and well in Kenya in 2026, and it's more important than ever for Kenyan businesses to invest in high-quality, locally tailored print materials. Whether you need business cards, banners, or brochures, Merit Graphics can help you create print assets that drive results in Kenya's market.</p>
      <p>Ready to elevate your Kenyan business with print design? Contact Merit Graphics today for a free quote.</p>
    `,
  },
  {
    id: 3,
    title: 'Designing for Kenyan Diverse Audience: A UI/UX Guide',
    category: 'ui-ux',
    excerpt: 'A complete guide to UI/UX design for Kenyan users—covering multilingual support, M-Pesa integration, low-data optimization, accessibility, and more in 2026.',
    image: '/portfolio/uiux.png',
    author: {
      name: 'James Ochieng',
      role: 'UX/UI Specialist',
      image: '/team/Team 04.jpeg',
    },
    date: '2026-06-10',
    readTime: '15 min read',
    content: `
      <h2>Introduction</h2>
      <p>Kenya is one of Africa's most diverse and dynamic countries, home to over 50 million people from all 47 Kenyan counties, plus expats and diaspora returning home. Designing digital products (websites, apps, WhatsApp flows) for this audience requires a deep understanding of local needs, behaviors, and constraints. In this comprehensive UI/UX guide for 2026, we'll share Merit Graphics' proven framework for designing for Kenyan users—backed by data from our work with over 100 Kenyan businesses.</p>
      
      <h2>Kenyan User Demographics and Behaviors (2026 Data)</h2>
      <p>Before diving into design principles, let's ground ourselves in Kenyan user data:</p>
      <ul>
        <li><strong>Device Usage:</strong> 87% of Kenyan internet users access the web primarily via Android smartphones (source: Communications Authority of Kenya, 2026)</li>
        <li><strong>Language:</strong> 92% of users prefer content in both English and Swahili, with 35% favoring Swahili for financial and local services</li>
        <li><strong>Data Concerns:</strong> 78% of Kenyan users worry about mobile data costs, making low-data design critical</li>
        <li><strong>Payment Preference:</strong> 96% of local digital transactions use M-Pesa, with Till Numbers preferred for in-person payments</li>
      </ul>

      <h2>Core UI/UX Principles for Kenyan Users</h2>
      <h3>1. Mobile-First (and Android-First) Design</h3>
      <p>With Android dominating Kenya's market, your digital products must be optimized for small screens and low-to-mid-range devices. Key tips:</p>
      <ul>
        <li>Design for 360x640px screens first—this covers most popular Android devices in Kenya (Tecno, Samsung Galaxy A-series)</li>
        <li>Keep file sizes under 1MB per page to reduce data usage and load times in areas with 3G or 4G (not 5G) coverage</li>
        <li>Avoid heavy animations or auto-playing videos that consume data and drain battery</li>
      </ul>
      <p>Merit Graphics redesigned Nairobi Boda Boda Insurance website with these principles, resulting in a 55% increase in mobile conversions and a 40% reduction in bounce rate, with similar results in their Mombasa and Kisumu markets.</p>

      <h3>2. Seamless M-Pesa Integration</h3>
      <p>M-Pesa isn't just a payment method in Kenya—it's part of daily life. Your UI/UX must make M-Pesa payments effortless:</p>
      <ul>
        <li>Display Till Numbers and Paybills prominently at every step of the checkout journey</li>
        <li>Include clear, step-by-step M-Pesa payment instructions in both English and Swahili</li>
        <li>Add a Save M-Pesa Till feature for returning customers</li>
        <li>Send instant payment confirmations via SMS and WhatsApp</li>
      </ul>

      <h3>3. Multilingual and Culturally Relevant Design</h3>
      <p>Kenyan users speak over 40 languages, but English and Swahili are universal. Your UI/UX should:</p>
      <ul>
        <li>Offer one-tap language switching between English and Swahili</li>
        <li>Use culturally appropriate imagery (avoid stereotypes!) featuring diverse Kenyan residents</li>
        <li>Include local place names and references to build trust (e.g., Delivering to Kibera, Westlands, Mombasa, Kisumu, and beyond)</li>
        <li>Consider right-to-left (RTL) support for Somali and Arabic speakers in Eastleigh and other Kenyan towns</li>
      </ul>

      <h3>4. Accessibility for All Kenyan Users</h3>
      <p>Accessibility isn't optional—it's essential for reaching all Kenyan users, including people with disabilities and older adults. Follow these WCAG 2.1 AA standards tailored to Kenya:</p>
      <ul>
        <li>High contrast ratios (minimum 4.5:1) for readability in bright Kenyan sunlight</li>
        <li>Large, tappable buttons (minimum 48x48px) for users with motor impairments or those using phones while walking</li>
        <li>Screen reader support for both English and Swahili</li>
        <li>Text resizing options up to 200% without breaking layout</li>
      </ul>

      <h2>Case Study: Merit Graphics Work with Kenyan County Governments</h2>
      <p>In 2025, Merit Graphics partnered with Nairobi, Mombasa, and Kisumu County governments to redesign their resident services portals, incorporating all the principles above. The results were astounding:</p>
      <ul>
        <li>80% increase in portal usage across all counties</li>
        <li>65% reduction in support calls about payment issues</li>
        <li>Recognition from the United Nations for inclusive digital design in Africa</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Designing for Kenyan diverse audience isn't just about following trends—it's about creating digital products that are usable, useful, and respectful of local users. By focusing on mobile-first, M-Pesa integration, multilingual support, and accessibility, your business can build digital experiences that resonate with Kenyan users in 2026 and beyond.</p>
      <p>Need help designing UI/UX for your Kenyan business? Contact Merit Graphics today to schedule a free UX audit.</p>
    `,
  },
  {
    id: 4,
    title: 'Branding for Kenyan SMEs: Budget-Friendly Tips to Make a Big Impact',
    category: 'branding',
    excerpt: 'Actionable, budget-friendly branding strategies for Kenyan small and medium enterprises (SMEs)—from logo design to social media—tailored for Kenyan markets in 2026.',
    image: '/portfolio/Brand 02.jpg',
    author: {
      name: 'Mildred Kerubo',
      role: 'Project Manager',
      image: '/team/Team 03.jpeg',
    },
    date: '2026-06-05',
    readTime: '11 min read',
    content: `
      <h2>Introduction</h2>
      <p>Small and medium enterprises (SMEs) are the heart of Kenya's economy—employing over 80% of the country's workforce and driving innovation from Kibera to Karen, and from Mombasa to Kisumu. But many Kenyan SMEs struggle with branding, believing it's only for big corporations with deep pockets. In this guide, we'll share 8 budget-friendly branding strategies specifically for Kenyan SMEs, with real success stories from Merit Graphics clients that cost less than KSh 50,000 to implement.</p>
      
      <h2>Why Kenyan SMEs Can't Afford to Ignore Branding</h2>
      <p>Before we dive into the tips, let's clarify why branding matters for Kenyan SMEs:</p>
      <ul>
        <li><strong>Stand Out in Crowded Markets:</strong> Whether you're in Gikomba, Eastleigh, or a Westlands co-working space, or in Mombasa's Old Town or Kisumu's CBD, strong branding helps you cut through the noise</li>
        <li><strong>Build Trust Quickly:</strong> In Kenya's cash-heavy economy, a professional brand makes customers feel comfortable paying upfront or via M-Pesa</li>
        <li><strong>Charge Premium Prices:</strong> Merit Graphics data shows that Kenyan SMEs with consistent branding can charge 20-30% more than their generic competitors</li>
        <li><strong>Expand Regionally:</strong> A strong brand makes it easier to expand to other Kenyan cities (Mombasa, Kisumu, Eldoret) and East Africa (Kampala, Dar es Salaam, Kigali)</li>
      </ul>

      <h2>8 Budget-Friendly Kenyan Branding Tips (2026)</h2>
      <h3>1. Start with a Professional, Scalable Logo (Under KSh 20,000)</h3>
      <p>Your logo is the foundation of your brand, and it doesn't have to be expensive. Merit Graphics offers affordable logo packages for Kenyan SMEs starting at KSh 15,000 that include:</p>
      <ul>
        <li>3 initial logo concepts tailored to your Kenyan business</li>
        <li>Revisions based on your feedback</li>
        <li>Final logo in all necessary formats (PNG, JPG, SVG) for digital and print</li>
        <li>1-color and 2-color versions for low-cost printing</li>
      </ul>
      <p>Kibera Juice Bar invested in a Merit Graphics logo and saw a 30% increase in sales after adding it to their cups, signs, and delivery motorcycles, with similar results at their new Mombasa branch.</p>

      <h3>2. Create a Simple Brand Style Guide (Under KSh 10,000)</h3>
      <p>A brand style guide ensures consistency across all your materials, even if you're working with multiple designers or creating content yourself. A basic style guide should include:</p>
      <ul>
        <li>Your color palette (primary, secondary, neutrals)</li>
        <li>2-3 approved fonts (Google Fonts are free and work great)</li>
        <li>Logo usage rules (minimum size, clear space, background colors)</li>
        <li>Simple do's and don'ts for social media posts</li>
      </ul>
      <p>Merit Graphics can create a basic brand style guide for your Kenyan SME for as low as KSh 8,000.</p>

      <h3>3. Leverage Free Social Media Tools (Facebook, Instagram, TikTok, WhatsApp)</h3>
      <p>Kenyan SMEs don't need expensive social media management tools—free platforms are more than enough. Focus on:</p>
      <ul>
        <li><strong>Instagram:</strong> Post high-quality photos of your products/services with Kenyan locations tagged</li>
        <li><strong>TikTok:</strong> Share behind-the-scenes videos of your business in Kenya (e.g., a tailor in Eastleigh, a coffee roaster in Karen, a beach shop in Mombasa)</li>
        <li><strong>WhatsApp Business:</strong> Create a professional profile with your logo, catalog, and M-Pesa details, and use broadcast lists to share updates</li>
        <li><strong>Facebook Groups:</strong> Join Kenyan-specific business groups (e.g., Kenyan SMEs Network, Westlands Business Owners, Mombasa Business Community) to promote your brand locally</li>
      </ul>

      <h3>4. Use Affordable, High-Quality Print Materials (Under KSh 15,000)</h3>
      <p>As we discussed in our previous article, print is still critical for Kenyan SMEs. Budget-friendly print options from Merit Graphics include:</p>
      <ul>
        <li>500 premium business cards for KSh 5,000</li>
        <li>100 A5 flyers for KSh 3,000</li>
        <li>A 3x5ft PVC banner for KSh 7,000</li>
      </ul>

      <h3>5. Partner with Kenyan Micro-Influencers (Barter or Low-Cost)</h3>
      <p>Kenya has thousands of micro-influencers (1,000-100,000 followers) who are often willing to partner with SMEs in exchange for products or low fees. Look for influencers who focus on Kenyan life, local food, fashion, or business.</p>
      <p>Ngong Road Fashion Boutique partnered with 3 Kenyan fashion micro-influencers, giving each a KSh 5,000 gift card in exchange for posts, and saw a 25% increase in online orders.</p>

      <h3>6. Optimize Your Google Business Profile for Local Search (Free)</h3>
      <p>One of the most powerful free branding tools for Kenyan SMEs is Google Business Profile. Make sure you:</p>
      <ul>
        <li>Claim and verify your profile</li>
        <li>Add your Kenyan address, phone number, WhatsApp link, and M-Pesa details</li>
        <li>Post high-quality photos of your business and products</li>
        <li>Encourage happy customers to leave reviews</li>
        <li>Use Kenyan-specific keywords in your profile (e.g., best tailor in Eastleigh, graphic design near Sarit Center, print shop in Mombasa)</li>
      </ul>

      <h3>7. Brand Your Delivery Vehicles and Packaging (Low Cost)</h3>
      <p>If your Kenyan SME uses delivery motorcycles, matatus, or vehicles, branding them is a moving billboard for your business. Affordable options include:</p>
      <ul>
        <li>Vinyl stickers for motorcycles (starting at KSh 3,000 from Merit Graphics)</li>
        <li>Custom packaging with your logo and M-Pesa details (e.g., paper bags for a bakery, envelopes for a courier)</li>
      </ul>

      <h3>8. Tell Your Kenyan Story (Free)</h3>
      <p>People in Kenya connect with stories, not sales pitches. Share your journey as a Kenyan SME:</p>
      <ul>
        <li>How you started your business (e.g., From a Kibera kiosk to a Karen shop, From a Mombasa market stall to a CBD store)</li>
        <li>Challenges you've overcome in Kenya's market</li>
        <li>Your team's stories and local connections</li>
        <li>Your commitment to the Kenyan community (e.g., supporting local schools or environmental initiatives)</li>
      </ul>
      <p>Share these stories on your website, social media, and in-person with customers.</p>

      <h2>Conclusion</h2>
      <p>Branding for Kenyan SMEs doesn't require a huge budget—it requires creativity, consistency, and a focus on the local market. By following these 8 tips, you can build a strong brand that helps your Kenyan business grow in 2026 and beyond.</p>
      <p>Ready to get started? Contact Merit Graphics today for a free 20-minute branding consultation for Kenyan SMEs.</p>
    `,
  },
]

export default function BlogPost() {
  const params = useParams()
  const articleId = Number(params.id)
  const article = articles.find((a) => a.id === articleId)
  
  // Compute related articles - first try same category, then fallback to any other articles
  const relatedArticles = article
    ? (() => {
        const sameCategory = articles.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 3)
        if (sameCategory.length > 0) return sameCategory
        return articles.filter((a) => a.id !== article.id).slice(0, 3)
      })()
    : []

  if (!article) {
    return (
      <MainLayout>
        <section className="py-24">
          <div className="container text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Article not found
            </h1>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              Back to Blog
            </Link>
          </div>
        </section>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-200 hover:text-white mb-6 hover:underline"
            >
              ← Back to Blog
            </Link>
            <div className="flex items-center justify-center gap-4 text-sm text-blue-200 mb-6">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              {article.title}
            </h1>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={article.author.image}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {article.author.name}
                </p>
                <p className="text-xs text-blue-200">
                  {article.author.role}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>

      {/* Related Posts */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Related Articles for Kenyan Businesses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle, index) => (
                <motion.div
                  key={relatedArticle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/blog/${relatedArticle.id}`} className="block">
                    <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                      <Image
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                      <span>{relatedArticle.readTime}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  )
}

export type Testimonial = {
  id: string
  quote: string
  author: string
  role: string
  company: string
  image: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      'Merit Graphics rebuilt our donor-facing materials from scratch. The new look is consistent across reports, banners, and social posts—and our team finally has files they can use without calling a designer every week.',
    author: 'Sarah Odhiambo',
    role: 'Communications Lead',
    company: 'Islamic Relief Kenya',
    image: '/team/Cleint 003.jpg',
    rating: 5,
  },
  {
    id: '2',
    quote:
      'We needed a company profile and pitch deck that felt professional for regional partners. Merit delivered on time, handled revisions calmly, and the print-ready files saved us a lot of back-and-forth with the printer.',
    author: 'Michael Nyambane',
    role: 'Program Director',
    company: 'Zigo Trace',
    image: '/team/Cleint 001.jpg',
    rating: 4,
  },
  {
    id: '3',
    quote:
      'We needed robust marketing collaterals for the lauch of our School. So we were reffered to Merit Graphics - they visualised all our marketing materials and got them printed in full high quality color. Highly recommend!',
    author: 'Millincet Wanjiru',
    role: 'Administration Officer',
    company: 'Robotech Innovators',
    image: '/team/Grace.jpg',
    rating: 5,
  },
  {
    id: '4',
    quote:
      'The website they built loads well on mobile data and explains our services clearly. Inquiries through the contact form picked up within the first month after launch.',
    author: 'Zachariah Rombo',
    role: 'Founder',
    company: 'Men Only Initiative',
    image: '/team/Rombo.jpg',
    rating: 4,
  },
  {
    id: '5',
    quote:
      'We needed a unique logo and a clear brand guideline bookelet to inform all our print and digital materials. Merit Graphics delivered on time and the final files are a great asset to use.',
    author: 'Fred Odhiambo',
    role: 'Founder & CEO',
    company: 'Possibility Corner',
    image: '/team/fred.jpg',
    rating: 3,
  },
]

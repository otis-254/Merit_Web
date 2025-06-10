'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useAnimation } from 'framer-motion'
import { MainLayout } from '../components/layout/main-layout'
import Link from 'next/link'


const slides = [
  {
    id: 1,
    image: '/portfolio/hero-1.png',
    title: 'Designs That Speak Volumes',
    subtitle: 'Crafting compelling visual stories that elevate your brand',
    highlight: 'Creative Excellence',
    cta: {
      primary: { text: 'View Portfolio', href: '/portfolio' },
      secondary: { text: 'Get a Quote', href: '/contact' }
    }
  },
  {
    id: 2,
    image: '/portfolio/hero-2.png',
    title: 'Innovative Brand Solutions',
    subtitle: 'Transforming ideas into impactful digital experiences',
    highlight: 'Digital Innovation',
    cta: {
      primary: { text: 'Our Services', href: '/services' },
      secondary: { text: 'Learn More', href: '/about' }
    }
  },
  {
    id: 3,
    image: '/portfolio/hero-3.png',
    title: 'Creative Excellence',
    subtitle: 'Where imagination meets strategic design',
    highlight: 'Strategic Design',
    cta: {
      primary: { text: 'View Projects', href: '/portfolio' },
      secondary: { text: 'Contact Us', href: '/contact' }
    }
  },
]

// Add new sections data
const testimonials = [
  {
    id: 1,
    quote: "Merit Graphics transformed our brand identity completely. Their creative approach and attention to detail exceeded our expectations.",
    author: "Sarah Odhiambo",
    role: "Marketing Director",
    company: "TechVision Inc.",
    image: "/team/Cleint 003.jpg"
  },
  {
    id: 2,
    quote: "The team's innovative design solutions helped us increase our conversion rates by 40%. Truly exceptional work!",
    author: "Michael Nyambane",
    role: "CEO",
    company: "GrowthLabs",
    image: "/team/Cleint 001.jpg"
  },
  {
    id: 3,
    quote: "Working with Merit Graphics was a game-changer for our business. Their strategic approach to design is unmatched.",
    author: "Emma Rodriguez",
    role: "Brand Manager",
    company: "Creative Solutions",
    image: "/team/Sarah.jpg"
  }
]

const processSteps = [
  {
    id: 1,
    title: "Discovery",
    description: "We dive deep into understanding your brand, goals, and target audience.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Strategy",
    description: "Developing a comprehensive plan to achieve your objectives.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Design",
    description: "Creating stunning visuals that capture your brand essence.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Delivery",
    description: "Implementing and launching your project with precision.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    )
  }
]

// Add Process Background Component
const ProcessBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Lines */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-[2px] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"
            style={{
              top: `${(i + 1) * 12}%`,
              left: "-100%",
              right: "-100%",
              transform: `rotate(${i * 15}deg)`,
            }}
            animate={{
              x: ["0%", "100%"],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Floating Circles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute rounded-full bg-gradient-to-br from-primary-500/40 to-secondary-500/40 backdrop-blur-[2px]"
          style={{
            width: `${Math.random() * 80 + 40}px`,
            height: `${Math.random() * 80 + 40}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Floating Boxes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`box-${i}`}
          className="absolute bg-gradient-to-br from-primary-500/30 to-secondary-500/30 backdrop-blur-[2px]"
          style={{
            width: `${Math.random() * 60 + 30}px`,
            height: `${Math.random() * 60 + 30}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 45}deg)`,
          }}
          animate={{
            rotate: [0, 45, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Gradient Overlay - Reduced opacity for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/60 dark:from-gray-900/60 dark:via-transparent dark:to-gray-900/60" />
    </div>
  )
}

// Add services list data
const designServices = [
  "Brand Identity Design",
  "Logo Design",
  "UI/UX Design",
  "Web Design",
  "Mobile App Design",
  "Print Design",
  "Packaging Design",
  "Motion Graphics",
  "Social Media Graphics",
  "Illustration",
  "Typography",
  "Icon Design",
  "Infographic Design",
  "Brochure Design",
  "Business Card Design",
  "Poster Design",
  "Banner Design",
  "Digital Marketing Design",
  "Email Template Design",
  "Presentation Design",
  "Web Development",
  "Mobile App Development",
  "E-commerce Development",
  "Custom Software Development"
]

const faqResponses = {
  greeting: "Hello! Thanks for Contacting Merit Graphics Customer Agent. How can I help you today?",
  default: "Thanks for asking! For more detailed response on your inquiries, please contact our team directly at +254 714 531 574.",
  questions: {
    "pricing": "Our pricing varies based on project scope and requirements. Basic logo design starts from $200, while comprehensive brand identity packages begin at $500. Would you like to discuss your specific needs?",
    "timeline": "Project timelines typically range from 2-4 weeks for basic designs to 6-8 weeks for comprehensive brand packages. We'll provide a detailed timeline after understanding your requirements.",
    "process": "Our process includes: 1) Discovery & Research, 2) Strategy Development, 3) Design Creation, and 4) Final Delivery. We maintain clear communication throughout each phase.",
    "services": "We offer: Brand Identity Design, Logo Design, UI/UX Design, Web Design, Print Design, Packaging Design, Motion Graphics, and Social Media Graphics. What specific service interests you?",
    "portfolio": "You can view our portfolio at /portfolio. We've worked with various industries including tech, retail, and healthcare.",
    "payment": "We accept various payment methods including bank transfers, PayPal, and mobile money. A 50% deposit is required to start the project.",
    "revisions": "We offer 3 rounds of revisions for each design phase to ensure your complete satisfaction.",
    "deliverables": "You'll receive all source files, including editable formats (AI, PSD, etc.), and usage guidelines. For web projects, we provide fully responsive designs.",
    "experience": "We have over 10 years of experience in the design industry, working with clients across various sectors including technology, healthcare, retail, and education.",
    "team": "Our team consists of experienced designers, developers, and project managers who work together to deliver exceptional results.",
    "location": "We're based in Kenya but work with clients globally. Our team can collaborate effectively across different time zones.",
    "start": "To start a project, simply share your requirements with us. We'll schedule a consultation to discuss your needs in detail and provide a customized proposal.",
    "support": "We provide ongoing support and maintenance for all our projects. Our team is always available to assist with any updates or changes you need.",
    "quality": "We maintain high quality standards through our rigorous review process. Each design goes through multiple quality checks before delivery.",
    "communication": "We use various communication tools including email, WhatsApp, and video calls to ensure smooth collaboration throughout the project.",
    "packages": "We offer different packages: Basic (Logo + Basic Branding), Standard (Full Brand Identity), and Premium (Complete Brand Solution with Marketing Materials).",
    "rush": "Yes, we offer rush services for urgent projects. Additional fees may apply depending on the timeline requirements.",
    "copyright": "Once the project is completed and fully paid, you'll own all rights to the designs. We'll provide a transfer of rights document.",
    "maintenance": "We offer maintenance packages for websites and ongoing design support. These can be discussed based on your specific needs.",
    "collaboration": "We welcome client collaboration throughout the design process. Your feedback is crucial in creating designs that meet your vision.",
    "guarantee": "We guarantee your satisfaction with our work. If you're not happy with the initial concepts, we'll revise them until you're satisfied."
  }
}

const getBotResponse = (message: string) => {
  const lowerMessage = message.toLowerCase()
  
  // Check for greetings
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || 
      lowerMessage.includes('good morning') || lowerMessage.includes('good afternoon') || lowerMessage.includes('good evening')) {
    return faqResponses.greeting
  }
  
  // Check for pricing related questions
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much') || 
      lowerMessage.includes('budget') || lowerMessage.includes('fee') || lowerMessage.includes('charge')) {
    return faqResponses.questions.pricing
  }
  
  // Check for timeline related questions
  if (lowerMessage.includes('time') || lowerMessage.includes('duration') || lowerMessage.includes('how long') || 
      lowerMessage.includes('when') || lowerMessage.includes('deadline') || lowerMessage.includes('schedule')) {
    return faqResponses.questions.timeline
  }
  
  // Check for process related questions
  if (lowerMessage.includes('process') || lowerMessage.includes('how do you work') || lowerMessage.includes('steps') || 
      lowerMessage.includes('methodology') || lowerMessage.includes('approach') || lowerMessage.includes('workflow')) {
    return faqResponses.questions.process
  }
  
  // Check for services related questions
  if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('offer') || 
      lowerMessage.includes('design') || lowerMessage.includes('create') || lowerMessage.includes('make')) {
    return faqResponses.questions.services
  }
  
  // Check for portfolio related questions
  if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('projects') || 
      lowerMessage.includes('examples') || lowerMessage.includes('previous') || lowerMessage.includes('case studies')) {
    return faqResponses.questions.portfolio
  }
  
  // Check for payment related questions
  if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('deposit') || 
      lowerMessage.includes('invoice') || lowerMessage.includes('billing') || lowerMessage.includes('money')) {
    return faqResponses.questions.payment
  }
  
  // Check for revision related questions
  if (lowerMessage.includes('revision') || lowerMessage.includes('change') || lowerMessage.includes('edit') || 
      lowerMessage.includes('modify') || lowerMessage.includes('adjust') || lowerMessage.includes('update')) {
    return faqResponses.questions.revisions
  }
  
  // Check for deliverables related questions
  if (lowerMessage.includes('deliver') || lowerMessage.includes('file') || lowerMessage.includes('format') || 
      lowerMessage.includes('receive') || lowerMessage.includes('get') || lowerMessage.includes('final')) {
    return faqResponses.questions.deliverables
  }

  // Check for experience related questions
  if (lowerMessage.includes('experience') || lowerMessage.includes('years') || lowerMessage.includes('long') || 
      lowerMessage.includes('background') || lowerMessage.includes('history')) {
    return faqResponses.questions.experience
  }

  // Check for team related questions
  if (lowerMessage.includes('team') || lowerMessage.includes('designer') || lowerMessage.includes('who') || 
      lowerMessage.includes('people') || lowerMessage.includes('staff')) {
    return faqResponses.questions.team
  }

  // Check for location related questions
  if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('based') || 
      lowerMessage.includes('country') || lowerMessage.includes('timezone')) {
    return faqResponses.questions.location
  }

  // Check for project start related questions
  if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('get started') || 
      lowerMessage.includes('how to') || lowerMessage.includes('first step')) {
    return faqResponses.questions.start
  }

  // Check for support related questions
  if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('assist') || 
      lowerMessage.includes('maintenance') || lowerMessage.includes('after')) {
    return faqResponses.questions.support
  }

  // Check for quality related questions
  if (lowerMessage.includes('quality') || lowerMessage.includes('standard') || lowerMessage.includes('excellence') || 
      lowerMessage.includes('best') || lowerMessage.includes('high')) {
    return faqResponses.questions.quality
  }

  // Check for communication related questions
  if (lowerMessage.includes('communication') || lowerMessage.includes('contact') || lowerMessage.includes('reach') || 
      lowerMessage.includes('talk') || lowerMessage.includes('discuss')) {
    return faqResponses.questions.communication
  }

  // Check for packages related questions
  if (lowerMessage.includes('package') || lowerMessage.includes('plan') || lowerMessage.includes('option') || 
      lowerMessage.includes('tier') || lowerMessage.includes('level')) {
    return faqResponses.questions.packages
  }

  // Check for rush service related questions
  if (lowerMessage.includes('rush') || lowerMessage.includes('urgent') || lowerMessage.includes('quick') || 
      lowerMessage.includes('fast') || lowerMessage.includes('emergency')) {
    return faqResponses.questions.rush
  }

  // Check for copyright related questions
  if (lowerMessage.includes('copyright') || lowerMessage.includes('rights') || lowerMessage.includes('ownership') || 
      lowerMessage.includes('legal') || lowerMessage.includes('license')) {
    return faqResponses.questions.copyright
  }

  // Check for maintenance related questions
  if (lowerMessage.includes('maintenance') || lowerMessage.includes('update') || lowerMessage.includes('change') || 
      lowerMessage.includes('modify') || lowerMessage.includes('edit')) {
    return faqResponses.questions.maintenance
  }

  // Check for collaboration related questions
  if (lowerMessage.includes('collaborate') || lowerMessage.includes('work together') || lowerMessage.includes('involve') || 
      lowerMessage.includes('participate') || lowerMessage.includes('contribute')) {
    return faqResponses.questions.collaboration
  }

  // Check for guarantee related questions
  if (lowerMessage.includes('guarantee') || lowerMessage.includes('satisfaction') || lowerMessage.includes('happy') || 
      lowerMessage.includes('sure') || lowerMessage.includes('promise')) {
    return faqResponses.questions.guarantee
  }
  
  return faqResponses.default
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.2])
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([])
  const [selectedWork, setSelectedWork] = useState<typeof featuredWork[0] | null>(null)

  useEffect(() => {
    // Auto-advance slides
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user' }])
      setMessage('')
      // Add bot response
      setTimeout(() => {
        const botResponse = getBotResponse(message)
        setMessages(prev => [...prev, { 
          text: botResponse, 
          sender: 'bot' 
        }])
      }, 1000)
    }
  }

  return (
    <MainLayout>
      {/* Hero Section with Photo Carousel */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Photo Carousel */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40 z-10" />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="absolute w-full h-full object-cover"
                style={{ 
                  opacity: typeof opacity === 'number' ? opacity : opacity.get(),
                  scale: typeof scale === 'number' ? scale : scale.get()
                }}
                onError={(e) => {
                  console.error('Error loading image:', slides[currentSlide].image);
                  e.currentTarget.src = '/portfolio/001.jpg'; // Fallback image
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-1/2 left-0 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-1/2 right-0 w-32 h-32 bg-secondary-500/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Highlight Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <span className="text-sm font-medium text-primary-400">
                  {slides[currentSlide].highlight}
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold tracking-tight text-white"
              >
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  {slides[currentSlide].title}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mx-auto max-w-2xl text-xl text-gray-200 leading-relaxed"
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Link
                  href={slides[currentSlide].cta.primary.href}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
                >
                  <span className="relative z-10">{slides[currentSlide].cta.primary.text}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <Link
                  href={slides[currentSlide].cta.secondary.href}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10">{slides[currentSlide].cta.secondary.text}</span>
                </Link>
              </motion.div>

              {/* Stats or Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4 max-w-3xl mx-auto"
              >
                {[
                  { label: 'Projects Completed', value: '200+' },
                  { label: 'Happy Clients', value: '35+' },
                  { label: 'Years Experience', value: '10+' },
                  { label: 'Awards Won', value: '25+' },
                ].map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-primary-400">{stat.value}</div>
                    <div className="mt-1 text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-4">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="p-3 rounded-full bg-white/10 hover:bg-primary-500 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/20"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  currentSlide === index ? 'bg-primary-500 scale-110' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="p-3 rounded-full bg-white/10 hover:bg-primary-500 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/20"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 right-8 z-20"
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-white/80">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full flex justify-center border-2 border-primary-500/50 backdrop-blur-sm"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-primary-500 rounded-full mt-2"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Section with Parallax */}
      <section className="relative py-24 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Our Services
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Comprehensive creative solutions to help your brand stand out in the digital landscape.
            </p>
          </motion.div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl bg-gray-50 p-8 dark:bg-gray-800 overflow-hidden"
              >
                {/* Gradient Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="text-primary-600 dark:text-primary-400 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-gray-900 dark:text-white">
                    {service.name}
                  </h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scrolling Services List */}
          <div className="mt-20 relative overflow-hidden w-full">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />
            
            {/* First Line */}
            <div className="flex overflow-x-hidden w-full mb-2">
              <motion.div
                className="flex gap-2"
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                  },
                }}
                style={{
                  width: "fit-content",
                }}
                whileHover={{ animationPlayState: "paused" }}
              >
                {designServices.slice(0, 8).map((service, index) => (
                  <motion.div
                    key={`service-1-${index}`}
                    className="flex-shrink-0 px-3 py-1.5 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full backdrop-blur-sm border border-primary-500/20 dark:border-primary-500/10"
                    whileHover={{
                      scale: 1.15,
                      backgroundColor: "rgba(var(--color-primary-500), 0.15)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <span className="text-sm text-primary-600 dark:text-primary-400 font-medium whitespace-nowrap">
                      {service}
                    </span>
                  </motion.div>
                ))}
                {designServices.slice(0, 8).map((service, index) => (
                  <motion.div
                    key={`service-1-dup-${index}`}
                    className="flex-shrink-0 px-3 py-1.5 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full backdrop-blur-sm border border-primary-500/20 dark:border-primary-500/10"
                    whileHover={{
                      scale: 1.15,
                      backgroundColor: "rgba(var(--color-primary-500), 0.15)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <span className="text-sm text-primary-600 dark:text-primary-400 font-medium whitespace-nowrap">
                      {service}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Second Line */}
            <div className="flex overflow-x-hidden w-full mb-2">
              <motion.div
                className="flex gap-2"
                animate={{
                  x: ["-50%", "0%"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 50,
                    ease: "linear",
                  },
                }}
                style={{
                  width: "fit-content",
                }}
                whileHover={{ animationPlayState: "paused" }}
              >
                {designServices.slice(8, 16).map((service, index) => (
                  <motion.div
                    key={`service-2-${index}`}
                    className="flex-shrink-0 px-3 py-1.5 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full backdrop-blur-sm border border-primary-500/20 dark:border-primary-500/10"
                    whileHover={{
                      scale: 1.15,
                      backgroundColor: "rgba(var(--color-primary-500), 0.15)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <span className="text-sm text-primary-600 dark:text-primary-400 font-medium whitespace-nowrap">
                      {service}
                    </span>
                  </motion.div>
                ))}
                {designServices.slice(8, 16).map((service, index) => (
                  <motion.div
                    key={`service-2-dup-${index}`}
                    className="flex-shrink-0 px-3 py-1.5 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full backdrop-blur-sm border border-primary-500/20 dark:border-primary-500/10"
                    whileHover={{
                      scale: 1.15,
                      backgroundColor: "rgba(var(--color-primary-500), 0.15)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <span className="text-sm text-primary-600 dark:text-primary-400 font-medium whitespace-nowrap">
                      {service}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Third Line */}
            <div className="flex overflow-x-hidden w-full">
              <motion.div
                className="flex gap-2"
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 45,
                    ease: "linear",
                  },
                }}
                style={{
                  width: "fit-content",
                }}
                whileHover={{ animationPlayState: "paused" }}
              >
                {designServices.slice(16).map((service, index) => (
                  <motion.div
                    key={`service-3-${index}`}
                    className="flex-shrink-0 px-3 py-1.5 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full backdrop-blur-sm border border-primary-500/20 dark:border-primary-500/10"
                    whileHover={{
                      scale: 1.15,
                      backgroundColor: "rgba(var(--color-primary-500), 0.15)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <span className="text-sm text-primary-600 dark:text-primary-400 font-medium whitespace-nowrap">
                      {service}
                    </span>
                  </motion.div>
                ))}
                {designServices.slice(16).map((service, index) => (
                  <motion.div
                    key={`service-3-dup-${index}`}
                    className="flex-shrink-0 px-3 py-1.5 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full backdrop-blur-sm border border-primary-500/20 dark:border-primary-500/10"
                    whileHover={{
                      scale: 1.15,
                      backgroundColor: "rgba(var(--color-primary-500), 0.15)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <span className="text-sm text-primary-600 dark:text-primary-400 font-medium whitespace-nowrap">
                      {service}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Pause on hover overlay */}
            <motion.div
              className="absolute inset-0 z-20 cursor-pointer"
              whileHover={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              style={{
                background: "transparent",
              }}
            />
          </div>
        </div>
      </section>

      {/* Featured Work Section with Hover Effects */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Featured Work
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Explore our latest projects and see how we've helped brands transform their visual identity.
            </p>
          </motion.div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredWork.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl bg-gray-900"
              >
                <div className="aspect-w-16 aspect-h-9">
                  {work.type === 'video' ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    >
                      <source src={work.media} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={work.media}
                      alt={work.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-semibold text-white">
                      {work.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-200">
                      {work.category}
                    </p>
                    <button
                      onClick={() => setSelectedWork(work)}
                      className="mt-4 inline-flex items-center text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors duration-300"
                    >
                      View Case Study
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 text-center"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center px-8 py-3 text-base font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors duration-300"
            >
              <span>View All Projects</span>
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <ProcessBackground />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Our Process
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              A streamlined approach to bringing your vision to life
            </p>
          </motion.div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 backdrop-blur-sm" />
                <div className="relative p-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg backdrop-blur-sm border border-white/30 dark:border-gray-700/30">
                  <div className="text-primary-500 dark:text-primary-400 transform group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                  <div className="mt-6 text-sm font-medium text-primary-500 dark:text-primary-400">
                    Step {step.id}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Client Success Stories
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Hear what our clients have to say about their experience
            </p>
          </motion.div>

          <div className="mt-20 relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />
            
            <div 
              className="flex space-x-8 animate-scroll hover:pause"
              style={{
                width: "fit-content",
                animation: "scroll 30s linear infinite",
              }}
            >
              {/* First set of testimonials */}
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={`testimonial-1-${index}`}
                  className="flex-shrink-0 w-[400px]"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                    <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-primary-500/20">
                          <img
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {testimonial.author}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <blockquote className="mt-6 text-gray-600 dark:text-gray-400">
                        "{testimonial.quote}"
                      </blockquote>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={`testimonial-2-${index}`}
                  className="flex-shrink-0 w-[400px]"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                    <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-primary-500/20">
                          <img
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {testimonial.author}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <blockquote className="mt-6 text-gray-600 dark:text-gray-400">
                        "{testimonial.quote}"
                      </blockquote>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white">
              Ready to Transform Your Brand?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
              Let's create something extraordinary together. Get in touch with us today.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Start Your Project
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-300 transform hover:scale-105"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Chat Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isChatOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-4 bg-primary-500 text-white">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-white/20">
                    <img
                      src="/team/Chat.jpg"
                      alt="Support Agent"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full ring-2 ring-white"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Chat with us</h3>
                  <p className="text-xs text-white/80">We're here to help!</p>
                </div>
              </div>
            </div>
            <div className="p-4 h-64 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Start a conversation with our team
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                          msg.sender === 'user'
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button 
                  type="submit"
                  className="px-4 py-2.5 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-50 p-4 bg-white dark:bg-gray-800 text-primary-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Featured Work Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedWork(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-7xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedWork(null)}
                className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors z-10"
              >
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Modal Content */}
              <div className="p-6">
                <div className="aspect-w-16 aspect-h-9 mb-6">
                  {selectedWork.type === 'video' ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover rounded-lg"
                    >
                      <source src={selectedWork.media} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={selectedWork.media}
                      alt={selectedWork.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedWork.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  {selectedWork.category}
                </p>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedWork.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  )
}

const services = [
  {
    name: "Brand Identity",
    description: "Create a unique and memorable brand identity that resonates with your target audience.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  {
    name: "UI/UX Design",
    description: "Design intuitive and engaging user experiences that delight your customers.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    name: "Motion Graphics",
    description: "Bring your brand to life with captivating motion graphics and animations.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    name: "Print Design",
    description: "Create stunning print materials that make a lasting impression.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    )
  },
  {
    name: "Web/App Development",
    description: "Build modern, responsive websites and applications that drive results.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  }
]

type FeaturedWork = {
  id: string
  title: string
  category: string
  type: 'image' | 'video'
  media: string
  slug: string
  description: string
}

const featuredWork: FeaturedWork[] = [
  {
    id: 'brand-identity',
    title: 'Brand Identity Design',
    category: 'Branding',
    type: 'image',
    media: '/portfolio/brand-identity.jpg',
    slug: 'brand-identity',
    description: 'Comprehensive brand identity design including logo, color palette, typography, and brand guidelines.'
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    category: 'Digital Design',
    type: 'image',
    media: '/portfolio/ui-ux.jpg',
    slug: 'ui-ux',
    description: 'User-centered interface design with intuitive navigation and engaging user experience.'
  },
  {
    id: 'motion',
    title: 'Motion Graphics',
    category: 'Animation',
    type: 'video',
    media: '/portfolio/motion.mp4',
    slug: 'motion',
    description: 'Dynamic motion graphics and animations that bring your brand to life.'
  }
] 
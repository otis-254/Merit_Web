'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { MainLayout } from '../components/layout/main-layout'
import Link from 'next/link'


const slides = [
  {
    id: 1,
    video: '/videos/Graphic Desin 001.mp4',
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
    video: '/videos/Graphic Desin 002.mp4',
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
    video: '/videos/Graphic Desin 003.mp4',
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
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechVision Inc.",
    image: "/testimonials/client1.jpg"
  },
  {
    id: 2,
    quote: "The team's innovative design solutions helped us increase our conversion rates by 40%. Truly exceptional work!",
    author: "Michael Chen",
    role: "CEO",
    company: "GrowthLabs",
    image: "/testimonials/client2.jpg"
  },
  {
    id: 3,
    quote: "Working with Merit Graphics was a game-changer for our business. Their strategic approach to design is unmatched.",
    author: "Emma Rodriguez",
    role: "Brand Manager",
    company: "Creative Solutions",
    image: "/testimonials/client3.jpg"
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
  "Presentation Design"
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.2])
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    // Initialize video refs
    videoRefs.current = videoRefs.current.slice(0, slides.length)
    
    // Set playback rate for all videos
    videoRefs.current.forEach(video => {
      if (video) {
        video.playbackRate = 0.75
      }
    })

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <MainLayout>
      {/* Hero Section with Video Carousel */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Carousel */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <video
                ref={(el) => {
                  if (el) videoRefs.current[currentSlide] = el
                }}
                autoPlay
                loop
                muted
                playsInline
                className="absolute w-full h-full object-cover"
                style={{ opacity, scale }}
              >
                <source src={slides[currentSlide].video} type="video/mp4" />
              </video>
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
            onClick={prevSlide}
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
            onClick={nextSlide}
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
          <div className="mt-20 relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />
            
            <div className="flex overflow-x-hidden">
              <motion.div
                className="flex space-x-8"
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
                style={{
                  width: "fit-content",
                }}
              >
                {/* First set of items */}
                {designServices.map((service, index) => (
                  <motion.div
                    key={`service-1-${index}`}
                    className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full backdrop-blur-sm border border-primary-500/20 dark:border-primary-500/10"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(var(--color-primary-500), 0.15)",
                    }}
                  >
                    <span className="text-primary-600 dark:text-primary-400 font-medium whitespace-nowrap">
                      {service}
                    </span>
                  </motion.div>
                ))}
                {/* Duplicate set for seamless loop */}
                {designServices.map((service, index) => (
                  <motion.div
                    key={`service-2-${index}`}
                    className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full backdrop-blur-sm border border-primary-500/20 dark:border-primary-500/10"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(var(--color-primary-500), 0.15)",
                    }}
                  >
                    <span className="text-primary-600 dark:text-primary-400 font-medium whitespace-nowrap">
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
                    <Link
                      href={`/portfolio/${work.slug}`}
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
                    </Link>
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
      <section className="py-24 bg-white dark:bg-gray-900">
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

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
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
              </motion.div>
            ))}
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
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-4 bg-primary-500 text-white">
              <h3 className="font-semibold">Chat with us</h3>
              <p className="text-sm text-white/80">We're here to help!</p>
            </div>
            <div className="p-4 h-96 overflow-y-auto">
              {/* Chat messages would go here */}
              <div className="text-center text-gray-500 dark:text-gray-400">
                Start a conversation with our team
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                  Send
                </button>
              </div>
            </div>
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
    </MainLayout>
  )
}

const services = [
  {
    name: 'Brand Identity',
    description: 'Create a unique and memorable brand identity that resonates with your target audience.',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    name: 'UI/UX Design',
    description: 'Design intuitive and engaging user interfaces that provide exceptional user experiences.',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Motion Graphics',
    description: 'Bring your brand to life with captivating motion graphics and animations.',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
]

const featuredWork = [
  {
    id: 'brand-refresh',
    title: 'Modern Brand Refresh',
    category: 'Brand Identity',
    type: 'image',
    media: '/portfolio/001.jpg',
    slug: 'brand-refresh'
  },
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    category: 'UI/UX Design',
    type: 'image',
    media: '/portfolio/Web.jpeg',
    slug: 'ecommerce-platform'
  },
  {
    id: 'business-promo',
    title: 'Business Promo Ad',
    category: 'Motion Graphics',
    type: 'video',
    media: '/portfolio/KALABAYI.mp4',
    slug: 'business-promo'
  },
] 
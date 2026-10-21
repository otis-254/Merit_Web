'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MainLayout } from '../../components/layout/main-layout'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ArrowRight, X } from 'lucide-react'
import { caseStudies } from '../../data/case-studies'

const projects = [
  {
    id: 1,
    title: 'Brand Identity Design',
    description: 'Comprehensive brand identity design including logo, color palette, typography, and brand guidelines.',
    image: '/portfolio/001.jpg',
    imageAlt: 'Blue, green and black brand stationery, including business cards, letterhead and an invoice.',
    tags: ['Brand Identity', 'Logo Design', 'Visual Identity'],
    link: '/services/brand-identity'
  },
  {
    id: 2,
    title: 'E-commerce Website Design',
    description: 'Modern and user-friendly e-commerce website design with focus on conversion optimization.',
    image: '/portfolio/web 02.jpeg',
    imageAlt: 'Mobile interface mockups for online healthcare consultations.',
    tags: ['UI/UX Design', 'E-commerce', 'Web Design'],
    link: '/services/ui-ux'
  },
  {
    id: 3,
    title: 'Motion Graphics',
    description: 'Engaging motion graphics and animation for social media and business promotion.',
    image: '/portfolio/hero-2.png',
    imageAlt: 'A person editing video on a laptop.',
    tags: ['Motion Graphics', 'Animation', 'Social Media' , 'Business Promo Ad'],
    link: '/services/motion-graphics'
  },
  {
    id: 4,
    title: 'Brochure Design',
    description: 'Professional brochure design with compelling layout and typography.',
    image: '/portfolio/brochures.jpg',
    imageAlt: 'Green agriculture brochure covers and open page layouts.',
    tags: ['Print Design', 'Brochure', 'Layout'],
    link: '/services/print-design'
  },
  {
    id: 5,
    title: 'Mobile App Design',
    description: 'Intuitive and modern mobile app interface design with focus on user experience.',
    image: '/portfolio/App.jpeg',
    imageAlt: 'Two mobile screens showing a cryptocurrency wallet interface.',
    tags: ['UI/UX Design', 'Mobile App', 'Interface Design'],
    link: '/services/ui-ux'
  },
  {
    id: 6,
    title: 'Brand Guidelines',
    description: 'Comprehensive brand guidelines ensuring consistent brand application across all touchpoints.',
    image: '/portfolio/Brand.jpg',
    imageAlt: 'Brand guideline layouts showing a logo, typography and color palette.',
    tags: ['Brand Identity', 'Brand Guidelines', 'Visual Identity'],
    link: '/services/brand-identity'
  },
  {
    id: 7,
    title: 'Poster Series',
    description: 'Creative poster series design with unique illustrations and typography.',
    image: '/portfolio/poster-series.jpg',
    imageAlt: 'Purple promotional graphics featuring açaí drinks and illustrated characters.',
    tags: ['Print Design', 'Poster', 'Illustration'],
    link: '/services/print-design'
  },
  {
    id: 8,
    title: 'Luxury Packaging',
    description: 'Premium packaging design for luxury products with attention to detail.',
    image: '/portfolio/pachage.jpg',
    imageAlt: 'Blue and brown chocolate cookie packaging.',
    tags: ['Print Design', 'Packaging', 'Luxury'],
    link: '/services/print-design'
  },
  {
    id: 9,
    title: 'Annual Report',
    description: 'Professional annual report design with data visualization and infographics.',
    image: '/portfolio/Annual.png',
    imageAlt: 'An annual report cover and page layouts in orange, gray and white.',
    tags: ['Print Design', 'Report', 'Infographics'],
    link: '/services/print-design'
  },
  {
    id: 10,
    title: 'Web Application Development',
    description: 'Full-stack web application development with modern technologies and responsive design.',
    image: '/portfolio/web-app.jpeg',
    imageAlt: 'A dark NFT marketplace website mockup displayed on a tablet.',
    tags: ['Web Development', 'Full Stack', 'Responsive Design'],
    link: '/services/web-app-development'
  }
]

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: '/services/brand-identity', name: 'Brand Identity' },
  { id: '/services/ui-ux', name: 'UI/UX Design' },
  { id: '/services/motion-graphics', name: 'Motion Graphics' },
  { id: '/services/print-design', name: 'Print Design' },
  { id: '/services/web-app-development', name: 'Web Development' },
]

const Portfolio = () => {
  const [mounted, setMounted] = useState(false)
  const [selectedProject, setSelectedProject] = useState<typeof projects[number] | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const previewCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const visibleProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.link === selectedCategory)

  return (
    <MainLayout>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Dialog open={selectedProject !== null} onClose={() => setSelectedProject(null)} initialFocus={previewCloseRef} className="fixed inset-0 z-50">
          <DialogBackdrop className="fixed inset-0 bg-black/90 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4">
            {selectedProject && (
              <DialogPanel className="relative w-full max-w-5xl rounded-2xl bg-gray-900 p-4 shadow-2xl sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <DialogTitle className="text-lg font-semibold text-white">{selectedProject.title}</DialogTitle>
                  <button ref={previewCloseRef} data-autofocus type="button" aria-label="Close image preview" onClick={() => setSelectedProject(null)} className="rounded-full p-2 text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                    <X aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
                <Image src={selectedProject.image} alt={selectedProject.imageAlt} width={1200} height={800} className="mx-auto max-h-[75vh] w-auto rounded-lg object-contain" />
              </DialogPanel>
            )}
          </div>
        </Dialog>

        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 dark:from-primary-900 dark:via-primary-800 dark:to-primary-700">
            {/* Animated Balls */}
            {mounted && (
              <>
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-white/10 backdrop-blur-sm"
                    style={{
                      width: Math.random() * 100 + 50,
                      height: Math.random() * 100 + 50,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      x: [0, Math.random() * 100 - 50],
                      y: [0, Math.random() * 100 - 50],
                    }}
                    transition={{
                      duration: Math.random() * 10 + 10,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </>
            )}
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white mt-20">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Our Portfolio
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl mb-8"
              >
                Explore our creative work and see how we've helped businesses achieve their goals through innovative design solutions.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-20">
          <div className="container">
            <div className="mb-10 flex flex-wrap justify-center gap-3" aria-label="Filter projects by service">
              {categories.map(category => (
                <button key={category.id} type="button" disabled={!mounted} aria-pressed={selectedCategory === category.id} onClick={() => setSelectedCategory(category.id)} className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${selectedCategory === category.id ? 'border-primary-700 bg-primary-700 text-white' : 'border-gray-200 bg-white text-gray-700 hover:border-primary-500 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200'}`}>
                  {category.name}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="ds-card ds-card-hover group relative overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
                >
                  <div className="relative aspect-[4/3]">
                    {project.image.endsWith('.mp4') ? (
                      <video
                        src={project.image}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-700 dark:text-primary-400">{project.tags[0]}</p>
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{project.description}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-semibold">
                      <button type="button" disabled={!mounted} onClick={() => setSelectedProject(project)} aria-label={`Preview ${project.title}`} className="btn-secondary">Preview</button>
                      <Link href={project.link} className="inline-flex items-center gap-1 text-primary-700 hover:text-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:text-primary-400">Explore service <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20 dark:bg-gray-950">
          <div className="container">
            <div className="mb-10 max-w-2xl">
              <h2 className="ds-section-title">Stories behind the work</h2>
              <p className="ds-section-intro mt-4">Explore our existing case studies for a closer look at the challenges and creative approach behind the work.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {caseStudies.map(study => (
                <Link key={study.id} href={`/case-studies/${study.slug}`} className="ds-card ds-card-hover flex flex-col p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-700 dark:text-primary-400">{study.category}</span>
                  <h3 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">{study.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{study.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 dark:text-primary-400">Read case study <ArrowRight aria-hidden="true" className="h-4 w-4" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
            <p className="text-white text-xl mb-8">Let's create something amazing together.</p>
            <Link 
              href="/contact" 
              className="btn-inverse"
            >
              Get Started Today
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}

export default Portfolio

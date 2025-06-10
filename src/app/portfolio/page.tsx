'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MainLayout } from '../../components/layout/main-layout'
import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    id: 1,
    title: 'Brand Identity Design',
    description: 'Comprehensive brand identity design including logo, color palette, typography, and brand guidelines.',
    image: '/portfolio/001.jpg',
    tags: ['Brand Identity', 'Logo Design', 'Visual Identity'],
    link: '/services/brand-identity'
  },
  {
    id: 2,
    title: 'E-commerce Website Design',
    description: 'Modern and user-friendly e-commerce website design with focus on conversion optimization.',
    image: '/portfolio/web 02.jpeg',
    tags: ['UI/UX Design', 'E-commerce', 'Web Design'],
    link: '/services/ui-ux'
  },
  {
    id: 3,
    title: 'Motion Graphics',
    description: 'Engaging motion graphics and animation for social media and business promotion.',
    image: '/portfolio/hero-2.png',
    tags: ['Motion Graphics', 'Animation', 'Social Media' , 'Business Promo Ad'],
    link: '/services/motion-graphics'
  },
  {
    id: 4,
    title: 'Brochure Design',
    description: 'Professional brochure design with compelling layout and typography.',
    image: '/portfolio/Brochure.png',
    tags: ['Print Design', 'Brochure', 'Layout'],
    link: '/services/print-design'
  },
  {
    id: 5,
    title: 'Mobile App Design',
    description: 'Intuitive and modern mobile app interface design with focus on user experience.',
    image: '/portfolio/App.jpeg',
    tags: ['UI/UX Design', 'Mobile App', 'Interface Design'],
    link: '/services/ui-ux'
  },
  {
    id: 6,
    title: 'Brand Guidelines',
    description: 'Comprehensive brand guidelines ensuring consistent brand application across all touchpoints.',
    image: '/portfolio/Brand.jpg',
    tags: ['Brand Identity', 'Brand Guidelines', 'Visual Identity'],
    link: '/services/brand-identity'
  },
  {
    id: 7,
    title: 'Poster Series',
    description: 'Creative poster series design with unique illustrations and typography.',
    image: '/portfolio/poster-series.jpg',
    tags: ['Print Design', 'Poster', 'Illustration'],
    link: '/services/print-design'
  },
  {
    id: 8,
    title: 'Luxury Packaging',
    description: 'Premium packaging design for luxury products with attention to detail.',
    image: '/portfolio/Brand 02.jpg',
    tags: ['Print Design', 'Packaging', 'Luxury'],
    link: '/services/print-design'
  },
  {
    id: 9,
    title: 'Annual Report',
    description: 'Professional annual report design with data visualization and infographics.',
    image: '/portfolio/Annual.png',
    tags: ['Print Design', 'Report', 'Infographics'],
    link: '/services/print-design'
  },
  {
    id: 10,
    title: 'Web Application Development',
    description: 'Full-stack web application development with modern technologies and responsive design.',
    image: '/portfolio/web-app.jpeg',
    tags: ['Web Development', 'Full Stack', 'Responsive Design'],
    link: '/services/web-app-development'
  }
]

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'branding', name: 'Brand Identity' },
  { id: 'ui-ux', name: 'UI/UX Design' },
  { id: 'motion', name: 'Motion Graphics' },
  { id: 'print', name: 'Print Design' },
]

const Portfolio = () => {
  const [mounted, setMounted] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleImageClick = (image: string) => {
    setSelectedImage(image)
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Image Modal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: selectedImage ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm ${
            selectedImage ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          onClick={handleCloseModal}
        >
          {selectedImage && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-7xl max-h-[90vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Full size image"
                width={1200}
                height={800}
                className="object-contain max-h-[90vh] rounded-lg"
              />
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
              >
                <svg
                  className="w-6 h-6 text-white"
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
            </motion.div>
          )}
        </motion.div>

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
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]"
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
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs font-medium px-2 py-1 bg-white/20 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-200">{project.description}</p>
                      <Link
                        href={project.link}
                        className="mt-4 inline-flex items-center text-sm font-medium text-white hover:text-gray-200"
                        onClick={(e) => {
                          e.preventDefault()
                          handleImageClick(project.image)
                        }}
                      >
                        View Details
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
            <p className="text-white text-xl mb-8">Let's create something amazing together.</p>
            <Link 
              href="/contact" 
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
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
'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MainLayout } from '../../components/layout/main-layout'
import Image from 'next/image'

const projects = [
  {
    id: 1,
    title: 'Modern Brand Refresh',
    category: 'branding',
    description: 'Complete brand transformation for a tech startup, including logo design, visual identity, and brand guidelines.',
    image: '/portfolio/001.jpg',
    tags: ['Brand Identity', 'Logo Design', 'Visual Identity'],
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    category: 'ui-ux',
    description: 'User-centered design for an online retail platform, focusing on intuitive navigation and seamless shopping experience.',
    image: '/portfolio/web 02.jpeg',
    tags: ['UI/UX Design', 'E-commerce', 'Web Design'],
  },
  {
    id: 3,
    title: 'Business Promo Ad',
    category: 'motion',
    description: 'Animated campaign for a new product launch, including social media content and promotional videos.',
    image: '/portfolio/KALABAYI.mp4',
    tags: ['Motion Graphics', 'Animation', 'Social Media' , 'Business Promo Ad'],
  },
  {
    id: 4,
    title: 'Corporate Brochure',
    category: 'print',
    description: 'Design and layout of a comprehensive corporate brochure showcasing company services and achievements.',
    image: '/portfolio/Brochure.png',
    tags: ['Print Design', 'Brochure', 'Layout'],
  },
  {
    id: 5,
    title: 'Mobile App Interface',
    category: 'ui-ux',
    description: 'User interface design for a mobile application, focusing on accessibility and user experience.',
    image: '/portfolio/App.jpeg',
    tags: ['UI/UX Design', 'Mobile App', 'Interface Design'],
  },
  {
    id: 6,
    title: 'Brand Guidelines',
    category: 'branding',
    description: 'Comprehensive brand guidelines for a financial institution, ensuring consistent brand application across all touchpoints.',
    image: '/portfolio/Brand.jpg',
    tags: ['Brand Identity', 'Brand Guidelines', 'Visual Identity'],
  },
  {
    id: 7,
    title: 'Event Poster Series',
    category: 'print',
    description: 'A vibrant poster series for a local arts festival, blending illustration and bold typography.',
    image: '/portfolio/poster-series.jpg',
    tags: ['Print Design', 'Poster', 'Illustration'],
  },
  {
    id: 8,
    title: 'Luxury Product Packaging',
    category: 'print',
    description: 'Elegant packaging design for a luxury skincare brand, focusing on tactile finishes and premium feel.',
    image: '/portfolio/Brand 02.jpg',
    tags: ['Print Design', 'Packaging', 'Luxury'],
  },
  {
    id: 9,
    title: 'Annual Report Layout',
    category: 'print',
    description: 'Clean, data-driven layout for a corporate annual report, balancing infographics and readability.',
    image: '/portfolio/Annual.png',
    tags: ['Print Design', 'Report', 'Infographics'],
  },
]

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'branding', name: 'Brand Identity' },
  { id: 'ui-ux', name: 'UI/UX Design' },
  { id: 'motion', name: 'Motion Graphics' },
  { id: 'print', name: 'Print Design' },
]

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter((project) => project.category === selectedCategory)

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              Our Portfolio
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Explore our latest projects and see how we've helped brands transform their visual identity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <div className="relative h-full w-full">
                      {/* Overlay border highlight */}
                      <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl border-2 border-primary-500 opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                      {project.image.endsWith('.mp4') ? (
                        <video
                          src={project.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="h-full w-full object-cover transition duration-300 group-hover:grayscale-0 grayscale group-hover:scale-105"
                        />
                      ) : (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition duration-300 group-hover:grayscale-0 grayscale group-hover:scale-105"
                        />
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="mt-6 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
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
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex min-h-screen items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-4xl rounded-2xl bg-white p-6 dark:bg-gray-900"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800"
                >
                  <svg
                    className="h-6 w-6"
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
                <div className="aspect-w-16 aspect-h-9 mb-6 overflow-hidden rounded-xl">
                  <div className="relative h-full w-full">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedProject.title}
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  {selectedProject.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 -z-10 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  )
} 
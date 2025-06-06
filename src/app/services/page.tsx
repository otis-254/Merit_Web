'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MainLayout } from '@/components/layout/main-layout'
import Link from 'next/link'

const services = [
  {
    id: 'branding',
    title: 'Brand Identity',
    description: 'Create a unique and memorable brand identity that resonates with your target audience.',
    features: [
      'Brand Strategy Development',
      'Logo Design',
      'Visual Identity System',
      'Brand Guidelines',
      'Brand Collateral Design',
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'Design intuitive and engaging user interfaces that provide exceptional user experiences.',
    features: [
      'User Research & Analysis',
      'Wireframing & Prototyping',
      'User Interface Design',
      'User Experience Design',
      'Usability Testing',
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'motion',
    title: 'Motion Graphics',
    description: 'Bring your brand to life with captivating motion graphics and animations.',
    features: [
      '2D Animation',
      '3D Animation',
      'Motion Graphics',
      'Video Production',
      'Social Media Content',
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'print',
    title: 'Print Design',
    description: 'Create stunning print materials that make a lasting impression.',
    features: [
      'Brochure Design',
      'Business Cards',
      'Packaging Design',
      'Print Advertising',
      'Publication Design',
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    ),
  },
]

export default function Services() {
  const [activeService, setActiveService] = useState(services[0].id)

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary-50 via-white to-secondary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        {/* Decorative SVG or Icon */}
        <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none select-none hidden lg:block">
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
            <circle cx="200" cy="200" r="180" fill="url(#paint0_radial)" />
            <defs>
              <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(200 200) rotate(90) scale(180)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a5b4fc" />
                <stop offset="1" stopColor="#818cf8" stopOpacity="0.2" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="container relative z-10 flex flex-col items-center justify-center text-center">
          {/* Animated Design SVG */}
          <div className="mb-8 flex items-center justify-center">
            <span className="inline-flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 p-6 shadow-lg">
              <motion.svg
                width="72"
                height="72"
                viewBox="0 0 72 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial="hidden"
                animate="visible"
              >
                <motion.path
                  d="M12 60 Q36 12 60 60"
                  stroke="#6366f1"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                />
                <motion.circle
                  cx="36"
                  cy="36"
                  r="8"
                  fill="#818cf8"
                  initial={{ scale: 0.7, opacity: 0.7 }}
                  animate={{ scale: [0.7, 1.1, 0.7], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                />
                <motion.rect
                  x="30"
                  y="54"
                  width="12"
                  height="8"
                  rx="4"
                  fill="#a5b4fc"
                  initial={{ y: 58 }}
                  animate={{ y: [58, 54, 58] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                />
              </motion.svg>
            </span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
            className="font-display text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.6, 0.01, 0.05, 0.95] }}
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400"
          >
            Comprehensive creative solutions to help your brand stand out in the digital landscape.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Service Navigation */}
            <div className="space-y-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`w-full rounded-lg p-6 text-left transition-colors ${
                    activeService === service.id
                      ? 'bg-primary-50 text-primary-900 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="text-primary-600 dark:text-primary-400">
                      {service.icon}
                    </div>
                    <h3 className="ml-4 font-display text-xl font-semibold">
                      {service.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>

            {/* Service Details */}
            <div className="rounded-2xl bg-gray-50 p-8 dark:bg-gray-800">
              <AnimatePresence mode="wait">
                {services.map(
                  (service) =>
                    activeService === service.id && (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                          {service.title}
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">
                          {service.description}
                        </p>
                        <ul className="mt-8 space-y-4">
                          {service.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center text-gray-600 dark:text-gray-400"
                            >
                              <svg
                                className="h-5 w-5 text-primary-600 dark:text-primary-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="ml-3">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-8">
                          <Link
                            href="/contact"
                            className="inline-flex items-center rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                          >
                            Get Started
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
                        </div>
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="rounded-3xl bg-primary-600 px-6 py-16 sm:p-16">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Transform Your Brand?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-primary-100">
                Let's work together to create something extraordinary. Get in touch to discuss your project.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Link
                  href="/contact"
                  className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Contact Us
                </Link>
                <Link
                  href="/portfolio"
                  className="rounded-md bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
} 
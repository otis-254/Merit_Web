'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MainLayout } from '@/components/layout/main-layout'
import Image from 'next/image'

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Creative Director',
    image: '/team/Sarah.jpg',
    bio: 'With over 15 years of experience in creative direction, Sarah leads our team with passion and innovation.',
  },
  {
    name: 'Michael Chen',
    role: 'Lead Designer',
    image: '/team/michael.jpg',
    bio: 'Michael brings a unique perspective to every project, combining traditional design principles with modern techniques.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'UX/UI Specialist',
    image: '/team/emily.jpg',
    bio: 'Emily specializes in creating intuitive and engaging user experiences that delight and inspire.',
  },
]

const values = [
  {
    title: 'Innovation',
    description: 'We push boundaries and explore new possibilities in every project.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Excellence',
    description: 'We strive for perfection in every detail, delivering work that exceeds expectations.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: 'Collaboration',
    description: 'We believe in the power of teamwork and close client partnerships.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
]

export default function About() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-24 min-h-[80vh] flex items-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left"
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent">
                Crafting Digital Excellence
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                At Merit Graphics, we're more than just a design agency. We're your creative partners in building exceptional digital experiences that leave lasting impressions.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="/portfolio"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:text-lg"
                >
                  View Our Work
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-transparent hover:bg-primary-50 md:text-lg"
                >
                  Get in Touch
                </motion.a>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 1,
                ease: [0.6, 0.01, 0.05, 0.95],
                delay: 0.2
              }}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 mix-blend-multiply rounded-2xl z-10" />
              <Image
                src="/portfolio/001.jpg"
                alt="Merit Graphics Workspace"
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Decorative Elements */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute top-4 right-4 w-20 h-20 bg-primary-500/20 rounded-full blur-2xl z-0"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-4 left-4 w-32 h-32 bg-secondary-500/20 rounded-full blur-2xl z-0"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Our Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              The principles that guide our work and shape our culture.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <motion.div
                key={value.title}
                whileHover={{ y: -5 }}
                className="relative rounded-2xl bg-gray-50 p-8 dark:bg-gray-800"
              >
                <div className="text-primary-600 dark:text-primary-400">
                  {value.icon}
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl lg:max-w-5xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden w-full max-w-xs lg:max-w-sm lg:w-2/5 pr-0 lg:pr-8"
            >
              <Image
                src="/portfolio/001-1.jpg"
                alt="Creative workspace"
                fill
                className="object-cover"
              />
            </motion.div>
            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.6, 0.01, 0.05, 0.95] }}
              className="text-left w-full lg:w-3/5 pl-0 lg:pl-12 py-8"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-400 text-transparent bg-clip-text">
                Who Are We?
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Merit Graphics is a creative agency dedicated to transforming brands through innovative design, strategic thinking, and a passion for visual storytelling. Our mission is to empower businesses with compelling visual identities and digital experiences that captivate audiences and drive results.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                We believe in the power of creativity to inspire change and make a lasting impact. From branding and UI/UX design to motion graphics and print, our team combines expertise with a collaborative approach to deliver solutions tailored to your unique needs.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Discover how Merit Graphics can help elevate your brand and bring your vision to life. Let's create something extraordinary together.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
} 
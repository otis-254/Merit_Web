'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MainLayout } from '@/components/layout/main-layout'
import Image from 'next/image'
import Link from 'next/link'
import emailjs from 'emailjs-com';

const articles = [
  {
    id: 1,
    title: 'The Future of Brand Identity in the Digital Age',
    category: 'branding',
    excerpt: 'Explore how digital transformation is reshaping brand identity and what it means for businesses in 2024.',
    image: '/blog/article1.jpg',
    author: {
      name: 'Sarah Johnson',
      role: 'Brand Strategist',
      image: '/team/sarah.jpg',
    },
    date: '2024-05-10',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Designing for Accessibility: A Comprehensive Guide',
    category: 'ui-ux',
    excerpt: 'Learn the essential principles of accessible design and how to create inclusive digital experiences.',
    image: '/blog/article2.jpg',
    author: {
      name: 'Michael Chen',
      role: 'UX Designer',
      image: '/team/michael.jpg',
    },
    date: '2024-05-08',
    readTime: '8 min read',
  },
  {
    id: 3,
    title: 'Motion Graphics: Bringing Stories to Life',
    category: 'motion',
    excerpt: 'Discover how motion graphics can enhance storytelling and create engaging visual narratives.',
    image: '/blog/article3.jpg',
    author: {
      name: 'Emma Rodriguez',
      role: 'Motion Designer',
      image: '/team/emma.jpg',
    },
    date: '2024-05-05',
    readTime: '6 min read',
  },
  {
    id: 4,
    title: 'Print Design in a Digital World',
    category: 'print',
    excerpt: 'Why print design still matters and how to create effective print materials that complement digital strategies.',
    image: '/blog/article4.jpg',
    author: {
      name: 'David Kim',
      role: 'Print Designer',
      image: '/team/david.jpg',
    },
    date: '2024-05-03',
    readTime: '7 min read',
  },
  {
    id: 5,
    title: 'The Psychology of Color in Branding',
    category: 'branding',
    excerpt: 'Understanding how color choices impact brand perception and consumer behavior.',
    image: '/blog/article5.jpg',
    author: {
      name: 'Sarah Johnson',
      role: 'Brand Strategist',
      image: '/team/sarah.jpg',
    },
    date: '2024-05-01',
    readTime: '4 min read',
  },
  {
    id: 6,
    title: 'Mobile-First Design: Best Practices',
    category: 'ui-ux',
    excerpt: 'Essential tips and strategies for creating effective mobile-first user interfaces.',
    image: '/blog/article6.jpg',
    author: {
      name: 'Michael Chen',
      role: 'UX Designer',
      image: '/team/michael.jpg',
    },
    date: '2024-04-28',
    readTime: '9 min read',
  },
]

const categories = [
  { id: 'all', name: 'All Articles' },
  { id: 'branding', name: 'Branding' },
  { id: 'ui-ux', name: 'UI/UX Design' },
  { id: 'motion', name: 'Motion Graphics' },
  { id: 'print', name: 'Print Design' },
]

const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  emailjs.sendForm('service_pcmah8t', 'template_3i0vuek', e.currentTarget, 'meritmediapro007@gmail.com')
      .then((result) => {
          console.log('Email sent successfully:', result.text);
      }, (error) => {
          console.error('Error sending email:', error.text);
      });
};

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter((article) => article.category === selectedCategory)

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
              Blog & Insights
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Explore our latest articles, industry insights, and design trends.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
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

          {/* Articles Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="wait">
              {filteredArticles.map((article) => (
                <motion.article
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-800"
                >
                  <Link href={`/blog/${article.id}`}>
                    <div className="aspect-w-16 aspect-h-9">
                      <div className="relative h-full w-full">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
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
                      <h2 className="mt-4 font-display text-xl font-semibold text-gray-900 dark:text-white">
                        {article.title}
                      </h2>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {article.excerpt}
                      </p>
                      <div className="mt-6 flex items-center gap-4">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={article.author.image}
                            alt={article.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {article.author.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {article.author.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
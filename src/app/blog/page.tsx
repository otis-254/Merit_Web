'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MainLayout } from '@/components/layout/main-layout'
import { blogPosts } from '@/data/blog-posts'

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <MainLayout>
      <div className="bg-white dark:bg-gray-900">
        <section className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 py-16">
          <div className="container text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Blog</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Practical guides on branding, websites, and design pricing for businesses in Kenya.
            </p>
          </div>
        </section>

        <section className="container py-16">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sorted.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <Link href={`/blog/${post.slug}`} className="block aspect-[16/10] overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-4 md:p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-primary-600 dark:text-primary-400">{post.category}</span>
                    <span aria-hidden>·</span>
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('en-KE', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    <span aria-hidden>·</span>
                    <span>{post.readTimeMinutes} min</span>
                  </div>
                  <h2 className="mt-3 font-display text-lg font-bold leading-snug text-gray-900 dark:text-white md:text-xl">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary-600 transition-colors dark:hover:text-primary-400">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{post.description}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex items-center text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400"
                  >
                    Read article
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  )
}

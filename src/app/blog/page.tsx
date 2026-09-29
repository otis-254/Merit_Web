import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { MainLayout } from '@/components/layout/main-layout'
import { blogPosts } from '@/data/blog'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Practical branding, design and web advice for Kenyan businesses — from the Merit Graphics Solutions team.',
  alternates: { canonical: '/blog' },
}

const dateFormatter = new Intl.DateTimeFormat('en-KE', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export default function BlogPage() {
  return (
    <MainLayout>
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Blog
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              Straight advice on branding, design and getting found online —
              written for businesses in Kenya.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transition-shadow hover:shadow-xl"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-primary-600 dark:text-primary-400">
                      {post.category}
                    </span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="mt-3 font-display text-xl font-semibold text-gray-900 dark:text-white">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-gray-600 dark:text-gray-400">
                    {post.excerpt}
                  </p>
                  <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                    {dateFormatter.format(new Date(post.date))}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

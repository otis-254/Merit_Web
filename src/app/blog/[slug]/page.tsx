'use client'

import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MainLayout } from '@/components/layout/main-layout'
import { BlogContent } from '@/components/blog/BlogContent'
import { blogPosts, getBlogPostBySlug } from '@/data/blog-posts'

type PageProps = {
  params: { slug: string }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <MainLayout>
      <article className="bg-white dark:bg-gray-900">
        <header className="border-b border-gray-100 dark:border-gray-800">
          <div className="container max-w-3xl py-12 md:py-16">
            <Link
              href="/blog"
              className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
            >
              ← Back to blog
            </Link>
            <p className="mt-6 text-sm font-medium text-primary-600 dark:text-primary-400">{post.category}</p>
            <h1 className="mt-2 font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{post.description}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-KE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>{post.readTimeMinutes} min read</span>
            </div>
          </div>
          <div className="container max-w-4xl pb-10">
            <img
              src={post.coverImage}
              alt=""
              className="w-full rounded-2xl object-cover max-h-[420px] shadow-lg"
            />
          </div>
        </header>

        <div className="container max-w-3xl py-12 md:py-16">
          <BlogContent blocks={post.blocks} />

          <div className="mt-16 rounded-2xl bg-primary-50 dark:bg-primary-900/20 p-8 text-center">
            <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">Need a quote for your project?</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Use our instant quote tool or message us on WhatsApp—we respond quickly during business hours.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex px-6 py-3 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors"
              >
                Get a quote
              </Link>
              <a
                href="https://wa.me/254714531574"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                WhatsApp us
              </a>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16 border-t border-gray-200 pt-12 dark:border-gray-700">
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Continue reading</h2>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5">
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-600 dark:text-primary-400">
                        {item.category}
                      </span>
                      <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                        {item.title}
                      </h3>

                      <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                        <span>{item.readTimeMinutes} min read</span>
                        <span className="font-medium text-primary-600 dark:text-primary-400">Read now →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </MainLayout>
  )
}

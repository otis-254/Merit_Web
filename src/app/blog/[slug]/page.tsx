import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MainLayout } from '@/components/layout/main-layout'
import { blogPosts, getBlogPost, type BlogBlock } from '@/data/blog'

type Props = { params: { slug: string } }

const dateFormatter = new Intl.DateTimeFormat('en-KE', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getBlogPost(params.slug)
  if (!post) return { title: 'Blog' }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: post.image }],
    },
  }
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="mt-12 font-display text-2xl font-semibold text-gray-900 dark:text-white">
          {block.text}
        </h2>
      )
    case 'ul':
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-lg text-gray-600 dark:text-gray-400">
              <span className="mt-2.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary-500" />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="mt-6 space-y-3">
          {block.items.map((item, index) => (
            <li key={item} className="flex gap-3 text-lg text-gray-600 dark:text-gray-400">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-sm font-semibold text-primary-600 dark:text-primary-400">
                {index + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      )
    case 'callout':
      return (
        <p className="mt-8 rounded-xl border-l-4 border-primary-500 bg-primary-500/5 p-6 text-lg font-medium text-gray-800 dark:text-gray-200">
          {block.text}
        </p>
      )
    default:
      return (
        <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          {block.text}
        </p>
      )
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2)

  return (
    <MainLayout>
      <article className="py-24 bg-white dark:bg-gray-900">
        <div className="container max-w-3xl">
          <Link
            href="/blog"
            className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
          >
            ← All posts
          </Link>

          <div className="mt-8 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium text-primary-600 dark:text-primary-400">
              {post.category}
            </span>
            <span>·</span>
            <span>{dateFormatter.format(new Date(post.date))}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h1>

          <img
            src={post.image}
            alt={post.title}
            className="mt-10 w-full rounded-2xl object-cover aspect-[16/9]"
          />

          <div className="mt-8">
            {post.content.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-gray-50 dark:bg-gray-800 p-8">
            <h2 className="font-display text-xl font-semibold text-gray-900 dark:text-white">
              Want help putting this in place?
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              We do this work for businesses across Kenya every week. Send us
              your situation and we will tell you what it takes.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center rounded-lg bg-primary-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-600"
            >
              Get in touch
            </Link>
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-xl font-semibold text-gray-900 dark:text-white">
                Read next
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 transition-shadow hover:shadow-lg"
                  >
                    <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {item.category}
                    </p>
                    <p className="mt-2 font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </p>
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

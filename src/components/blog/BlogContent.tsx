import React from 'react'
import type { BlogBlock } from '@/data/blog-posts'

export function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary-600 dark:prose-a:text-primary-400">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'p':
            return (
              <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {block.text}
              </p>
            )
          case 'h2':
            return (
              <h2 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
                {block.text}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={index} className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
                {block.text}
              </h3>
            )
          case 'ul':
            return (
              <ul key={index} className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )
          case 'callout':
            return (
              <div
                key={index}
                className="my-8 rounded-xl border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20 px-6 py-4 text-gray-800 dark:text-gray-200 not-prose"
              >
                {block.text}
              </div>
            )
          default:
            return null
        }
      })}
    </article>
  )
}

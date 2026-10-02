import React from 'react'
import type { Testimonial } from '@/data/testimonials'

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1 text-amber-400" aria-label={`${rating} out of 5 stars`}>
    {[...Array(5)].map((_, index) => (
      <svg
        key={index}
        viewBox="0 0 20 20"
        fill={index < rating ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.839-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.077 8.71c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 0 0 .95-.69l1.07-3.292Z" />
      </svg>
    ))}
  </div>
)

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="group relative h-full w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)] dark:border-slate-700 dark:bg-slate-900">
      <div className="absolute inset-x-5 top-0 h-1 rounded-b-full bg-gradient-to-r from-amber-400 via-primary-500 to-sky-500" />

      <div className="flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-primary-100 ring-offset-2 ring-offset-white dark:ring-primary-900/80 dark:ring-offset-slate-900">
              <img
                src={testimonial.image}
                alt={testimonial.author}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-slate-900 dark:text-white">
                {testimonial.author}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {testimonial.role}
              </p>
            </div>
          </div>

          <div className="pt-1">
            <StarRating rating={testimonial.rating} />
          </div>
        </div>

        <div className="mt-4 inline-flex w-fit items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {testimonial.company}
        </div>

        <blockquote className="mt-5 flex-1 text-base leading-7 text-slate-700 dark:text-slate-200">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Verified Client
          </span>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            {testimonial.rating}/5 experience
          </span>
        </div>
      </div>
    </article>
  )
}

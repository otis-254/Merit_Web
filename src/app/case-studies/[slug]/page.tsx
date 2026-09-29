import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MainLayout } from '@/components/layout/main-layout'
import { caseStudies, getCaseStudy } from '@/data/case-studies'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const study = getCaseStudy(params.slug)
  if (!study) return { title: 'Case Study' }

  return {
    title: `${study.client} — ${study.title}`,
    description: study.summary,
    alternates: { canonical: `/case-studies/${study.slug}` },
  }
}

export default function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy(params.slug)
  if (!study) notFound()

  return (
    <MainLayout>
      <article className="py-24 bg-white dark:bg-gray-900">
        <div className="container max-w-4xl">
          <Link
            href="/case-studies"
            className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
          >
            ← All case studies
          </Link>

          <div className="mt-8 flex items-center gap-4">
            {study.logo && (
              <img
                src={study.logo}
                alt={study.client}
                className="h-12 w-auto max-w-[140px] object-contain"
              />
            )}
            <div>
              <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                {study.category}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {study.client} · {study.timeline}
              </p>
            </div>
          </div>

          <h1 className="mt-6 font-display text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            {study.title}
          </h1>

          <img
            src={study.image}
            alt={study.title}
            className="mt-10 w-full rounded-2xl object-cover aspect-[16/9]"
          />

          <div className="mt-12 space-y-12">
            <section>
              <h2 className="font-display text-2xl font-semibold text-gray-900 dark:text-white">
                The problem
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                {study.problem}
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-gray-900 dark:text-white">
                What we did
              </h2>
              <ul className="mt-4 space-y-3">
                {study.whatWeDid.map((item) => (
                  <li key={item} className="flex gap-3 text-lg text-gray-600 dark:text-gray-400">
                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-8">
              <h2 className="font-display text-2xl font-semibold text-gray-900 dark:text-white">
                The result
              </h2>
              <ul className="mt-4 space-y-3">
                {study.result.map((item) => (
                  <li key={item} className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
                    <svg className="mt-1 h-6 w-6 flex-shrink-0 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-gray-900 dark:text-white">
                Services used
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {study.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-16 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 p-10 text-center">
            <h2 className="font-display text-2xl font-semibold text-white">
              Have a similar problem?
            </h2>
            <p className="mt-3 text-white/90">
              Tell us what is not working and we will tell you what it takes to fix it.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center rounded-lg bg-white px-8 py-3 text-base font-semibold text-primary-600 transition-colors hover:bg-gray-100"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </article>
    </MainLayout>
  )
}

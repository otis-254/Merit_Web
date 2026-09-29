import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { MainLayout } from '@/components/layout/main-layout'
import { caseStudies } from '@/data/case-studies'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Real client projects from Merit Graphics Solutions — the problem, what we did, and the result.',
  alternates: { canonical: '/case-studies' },
}

export default function CaseStudiesPage() {
  return (
    <MainLayout>
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Case Studies
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              Short, honest write-ups of client work: what was wrong, what we
              did about it, and what changed afterwards.
            </p>
          </div>

          <div className="mt-16 space-y-8">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="group block rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800 transition-shadow hover:shadow-xl"
              >
                <div className="grid md:grid-cols-5">
                  <div className="md:col-span-2 relative h-56 md:h-full">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="md:col-span-3 p-8">
                    <div className="flex items-center gap-4">
                      {study.logo && (
                        <img
                          src={study.logo}
                          alt={study.client}
                          className="h-10 w-auto max-w-[120px] object-contain"
                        />
                      )}
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {study.category}
                      </span>
                    </div>
                    <h2 className="mt-4 font-display text-2xl font-semibold text-gray-900 dark:text-white">
                      {study.title}
                    </h2>
                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                      {study.summary}
                    </p>
                    <p className="mt-6 inline-flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400">
                      Read the case study
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

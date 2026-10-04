import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MainLayout } from '@/components/layout/main-layout'
import { AnimatedCaseStudySection } from '@/components/case-studies/AnimatedCaseStudySection'
import { caseStudies, getCaseStudyBySlug } from '@/data/case-studies'

type PageProps = {
  params: { slug: string }
}

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }))
}

export default function CaseStudyPage({ params }: PageProps) {
  const study = getCaseStudyBySlug(params.slug)

  if (!study) {
    notFound()
  }

  const otherStudies = caseStudies.filter((s) => s.slug !== study.slug).slice(0, 2)

  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="relative h-[40vh] min-h-[280px] overflow-hidden">
          {study.type === 'video' ? (
            <video autoPlay loop muted playsInline className="h-full w-full object-cover">
              <source src={study.media} type="video/mp4" />
            </video>
          ) : (
            <img src={study.media} alt={study.title} className="h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container pb-10">
            <p className="text-sm font-medium text-primary-300 uppercase tracking-wider">{study.category}</p>
            <h1 className="mt-2 font-display text-3xl md:text-5xl font-bold text-white max-w-4xl">{study.title}</h1>
            <p className="mt-3 text-lg text-gray-200">{study.client}</p>
          </div>
        </div>

        <div className="container py-16">
          <div className="max-w-3xl">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">{study.summary}</p>

            <AnimatedCaseStudySection>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                  The problem
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">{study.problem}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                  What we did
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">{study.approach}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                  The result
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">{study.result}</p>
              </div>
            </AnimatedCaseStudySection>

            <div className="mt-14 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors"
              >
                Start a similar project
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                View portfolio
              </Link>
            </div>
          </div>

          {otherStudies.length > 0 && (
            <div className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-12">
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">More case studies</h2>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {otherStudies.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/case-studies/${item.slug}`}
                    className="group overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.media}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-primary-600 dark:text-primary-400">{item.category}</p>
                      <h3 className="mt-1 font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

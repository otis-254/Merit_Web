'use client'

import React from 'react'
import { Navigation } from './navigation'
import { ToTop } from '../ui/to-top'
import { LiveChat } from '../ui/live-chat'
import Link from 'next/link'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="flex flex-col items-start mb-4">
                <img
                  src="/portfolio/Logo@3x.png"
                  alt="Merit Graphics Logo"
                  width={240}
                  height={120}
                  className="h-28 w-auto object-contain"
                />
              </div>
              <h3 className="font-display text-lg font-semibold text-gray-900 dark:text-white">
                Merit Graphics Solutions
              </h3>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Creating compelling visual stories that elevate your brand and connect with your audience.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-gray-900 dark:text-white">
                Our Services
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/services/brand-identity" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    Brand Identity
                  </Link>
                </li>
                <li>
                  <Link href="/services/ui-ux" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    UI/UX Design
                  </Link>
                </li>
                <li>
                  <Link href="/services/motion-graphics" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    Motion Graphics
                  </Link>
                </li>
                <li>
                  <Link href="/services/print-design" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    Print Design
                  </Link>
                </li>
                <li>
                  <Link href="/services/web-app-development" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    Web/App Development
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-gray-900 dark:text-white">
                Contact
              </h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <svg
                    className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  meritmediapro007@gmail.com
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <svg
                    className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  (+254) 714-531 574
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <svg
                    className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Roysambu, Nairobi
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-gray-900 dark:text-white">
                Follow Us
              </h3>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                  Instagram
                </a>
                <a href="#" className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                  LinkedIn
                </a>
                <a href="#" className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Merit Graphics Solutions. All rights reserved.
          </div>
        </div>
      </footer>
      <ToTop />
      <LiveChat />
    </div>
  )
} 
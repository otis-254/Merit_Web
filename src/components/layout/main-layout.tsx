'use client'

import React from 'react'
import { Navigation } from './navigation'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <main className="pt-16">{children}</main>
      <footer className="bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="flex flex-col items-center mb-2">
                <img
                  src="/portfolio/MERIT.jpg"
                  alt="Merit Graphics Logo"
                  width={96}
                  height={96}
                  className="mb-2"
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
                Contact
              </h3>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Email: meritmediapro007@gmail.com<br />
                Phone: (+254) 714-531 574<br />
                Address: Roysambu, Nairobi
              </p>
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
    </div>
  )
} 
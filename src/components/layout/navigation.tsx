'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'About Us',
    href: '/about',
    dropdown: [
      { name: 'About Us', href: '/about#about-us' },
      { name: 'Vision & Mission', href: '/about#vision-mission' },
      { name: 'Our Team', href: '/about#our-team' },
    ]
  },
  { 
    name: 'Services',
    href: '/services',
    dropdown: [
      { name: 'Brand Identity', href: '/services/brand-identity' },
      { name: 'UI/UX Design', href: '/services/ui-ux' },
      { name: 'Motion Graphics', href: '/services/motion-graphics' },
      { name: 'Print Design', href: '/services/print-design' },
      { name: 'Web/App Development', href: '/services/web-app-development' },
    ]
  },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact', href: '/contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHasScrolled(latest > 20);
  });

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav 
      className="fixed top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800/30"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/portfolio/Logo@3x.png"
                alt="Merit Graphics Logo"
                width={200}
                height={100}
                className="h-20 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <div
                      className="group"
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                          pathname.startsWith(item.href)
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                        }`}
                      >
                        {item.name}
                        <ChevronDownIcon className="ml-1 h-4 w-4" />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute left-0 mt-2 w-96 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800"
                          >
                            <div className="grid grid-cols-2 gap-1">
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-3 py-2 text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <button
                onClick={toggleTheme}
                className="rounded-full p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                aria-label="Toggle theme"
              >
                {mounted && (
                  <>
                    {theme === 'dark' ? (
                      <SunIcon className="h-5 w-5" />
                    ) : (
                      <MoonIcon className="h-5 w-5" />
                    )}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleTheme}
              className="mr-2 rounded-full p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {mounted && (
                <>
                  {theme === 'dark' ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium ${
                          pathname.startsWith(item.href)
                            ? 'bg-primary-50 text-primary-600 dark:bg-gray-800 dark:text-primary-400'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary-400'
                        }`}
                      >
                        {item.name}
                        <ChevronDownIcon className={`h-5 w-5 transition-transform ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4"
                          >
                            <div className="grid grid-cols-2 gap-1">
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={() => setIsOpen(false)}
                                  className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary-400"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-md px-3 py-2 text-base font-medium ${
                        pathname === item.href
                          ? 'bg-primary-50 text-primary-600 dark:bg-gray-800 dark:text-primary-400'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary-400'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 
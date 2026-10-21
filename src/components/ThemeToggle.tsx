'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const transitionTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    setMounted(true)
    return () => {
      window.clearTimeout(transitionTimer.current)
      document.documentElement.classList.remove('theme-transitioning')
    }
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  function toggleTheme() {
    const root = document.documentElement
    window.clearTimeout(transitionTimer.current)
    root.classList.add('theme-transitioning')
    setTheme(isDark ? 'light' : 'dark')
    transitionTimer.current = window.setTimeout(() => root.classList.remove('theme-transitioning'), 350)
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={!mounted}
      aria-label={label}
      title={label}
      className="ds-icon-button border border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-800 dark:text-amber-300 dark:hover:bg-gray-700"
    >
      {isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
    </button>
  )
}

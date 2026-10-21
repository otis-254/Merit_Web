'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function AosProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    let active = true

    async function initialise() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      document.body.classList.add('aos-ready')
      const AOS = (await import('aos')).default
      if (!active) return

      AOS.init({ duration: 560, easing: 'ease-out-cubic', offset: 18, once: true })
      AOS.refreshHard()
    }

    void initialise()
    return () => {
      active = false
      document.body.classList.remove('aos-ready')
    }
  }, [pathname])

  return <>{children}</>
}

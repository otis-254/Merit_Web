'use client'

import { useEffect, useRef } from 'react'

export function CursorSpotlight() {
  const spotlight = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = spotlight.current
    if (!element) return

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let listening = false

    function hide() {
      element?.removeAttribute('data-active')
    }

    function move(event: PointerEvent) {
      if (event.pointerType !== 'mouse') return
      element?.style.setProperty('--spot-x', `${event.clientX}px`)
      element?.style.setProperty('--spot-y', `${event.clientY}px`)
      element?.setAttribute('data-active', 'true')
    }

    function leave(event: PointerEvent) {
      if (!event.relatedTarget) hide()
    }

    function updateListeners() {
      const enabled = finePointer.matches && !reducedMotion.matches
      if (enabled && !listening) {
        window.addEventListener('pointermove', move, { passive: true })
        window.addEventListener('pointerout', leave)
        window.addEventListener('blur', hide)
        listening = true
      } else if (!enabled && listening) {
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerout', leave)
        window.removeEventListener('blur', hide)
        listening = false
        hide()
      }
    }

    updateListeners()
    finePointer.addEventListener('change', updateListeners)
    reducedMotion.addEventListener('change', updateListeners)

    return () => {
      finePointer.removeEventListener('change', updateListeners)
      reducedMotion.removeEventListener('change', updateListeners)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerout', leave)
      window.removeEventListener('blur', hide)
    }
  }, [])

  return <div ref={spotlight} className="cursor-spotlight" aria-hidden="true" />
}

import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, route => route.abort())
})

test('desktop quote CTA uses a solid color and restrained animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/contact', { waitUntil: 'domcontentloaded' })

  const quote = page.getByRole('navigation').getByRole('link', { name: 'Free Instant Quote' })
  await expect(quote).toBeVisible()
  await expect.poll(() => quote.evaluate(element => getComputedStyle(element).backgroundImage)).toBe('none')
  await expect.poll(() => quote.evaluate(element => getComputedStyle(element).animationName)).not.toBe('none')
})

test('desktop quote CTA respects reduced-motion preferences', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/contact', { waitUntil: 'domcontentloaded' })

  await expect(page.getByRole('navigation').getByRole('link', { name: 'Free Instant Quote' })).toHaveCSS('animation-name', 'none')
})

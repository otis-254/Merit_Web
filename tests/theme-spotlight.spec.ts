import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, route => route.abort())
})

test('theme follows the system initially and remembers a visitor choice across pages', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/portfolio', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('html')).not.toHaveClass(/\bdark\b/)
  await page.getByRole('button', { name: 'Switch to dark mode' }).click()
  await expect(page.locator('html')).toHaveClass(/\bdark\b/)
  await page.reload({ waitUntil: 'domcontentloaded' })
  await expect(page.locator('html')).toHaveClass(/\bdark\b/)
  await page.goto('/contact', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('html')).toHaveClass(/\bdark\b/)
  await page.getByRole('button', { name: 'Switch to light mode' }).click()
  await expect(page.locator('html')).not.toHaveClass(/\bdark\b/)
})

test('dark system preference is respected when no choice has been saved', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/contact', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('html')).toHaveClass(/\bdark\b/)
  await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeVisible()
})

test('spotlight follows the pointer, changes with the theme and does not block controls', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'no-preference' })
  await page.goto('/portfolio', { waitUntil: 'domcontentloaded' })
  const spotlight = page.locator('.cursor-spotlight')
  await expect(spotlight).toHaveAttribute('aria-hidden', 'true')
  await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeEnabled()
  await page.mouse.move(250, 200)
  await expect.poll(async () => Number(await spotlight.evaluate(el => getComputedStyle(el).opacity))).toBeGreaterThan(0)
  await expect.poll(async () => {
    const box = await spotlight.boundingBox()
    return box ? Math.round(box.x + box.width / 2) : 0
  }).toBe(250)
  const light = await spotlight.evaluate(el => getComputedStyle(el, '::before').opacity)
  await page.getByRole('button', { name: 'Switch to dark mode' }).click()
  await expect(page.locator('html')).toHaveClass(/\bdark\b/)
  await expect.poll(() => spotlight.evaluate(el => getComputedStyle(el, '::before').opacity)).not.toBe(light)
  await page.getByRole('button', { name: 'Web Development', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Web Application Development' })).toBeVisible()
})

test('spotlight is absent for reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/portfolio', { waitUntil: 'domcontentloaded' })
  await page.mouse.move(250, 200)
  await expect(page.locator('.cursor-spotlight')).toBeHidden()
})

test('spotlight is absent on touch-only devices', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
  const page = await context.newPage()
  await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, route => route.abort())
  await page.goto('/portfolio', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('.cursor-spotlight')).toBeHidden()
  await expect(page.getByRole('button', { name: /Switch to (dark|light) mode/ })).toBeVisible()
  await context.close()
})

test('theme control stays usable across narrow and tablet widths', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'domcontentloaded' })
  for (const width of [320, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 800 })
    const toggle = page.getByRole('button', { name: /Switch to (dark|light) mode/ })
    await expect(toggle).toBeVisible()
    const box = await toggle.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.x).toBeGreaterThanOrEqual(0)
    expect(box!.x + box!.width).toBeLessThanOrEqual(width)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  }
})

test('uses the compact navigation through tablet widths', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'domcontentloaded' })
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 800 })
    await expect(page.getByRole('button', { name: 'Open main menu' })).toBeVisible()
  }
  await page.setViewportSize({ width: 1280, height: 800 })
  await expect(page.getByRole('button', { name: 'Open main menu' })).toHaveCount(0)
})

test('spotlight ignores pen pointer events', async ({ page }) => {
  await page.goto('/portfolio', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeEnabled()
  await page.locator('.cursor-spotlight').evaluate(element => {
    window.dispatchEvent(new PointerEvent('pointermove', { pointerType: 'pen', clientX: 200, clientY: 200 }))
    return element.hasAttribute('data-active')
  }).then(active => expect(active).toBe(false))
})

import { test, expect } from '@playwright/test'

test('page cards support light and dark styling on desktop and mobile', async ({ page }) => {
  test.setTimeout(90000)
  await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, route => route.abort())

  for (const viewport of [{ width: 390, height: 844 }, { width: 1280, height: 800 }]) {
    await page.setViewportSize(viewport)
    for (const path of ['/portfolio', '/contact']) {
      await page.goto(path, { waitUntil: 'domcontentloaded' })
      const card = page.locator('main .ds-card').first()
      await expect(card).toBeVisible()
      const light = await card.evaluate(element => getComputedStyle(element).backgroundColor)
      await page.evaluate(() => document.documentElement.classList.add('dark'))
      await expect.poll(() => card.evaluate(element => getComputedStyle(element).backgroundColor)).not.toBe(light)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    }
  }
})

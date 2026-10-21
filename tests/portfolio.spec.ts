import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, route => route.abort())
})

test('filters by service and restores all work', async ({ page }) => {
  await page.goto('/portfolio', { waitUntil: 'domcontentloaded' })
  const filter = page.getByRole('button', { name: 'Web Development', exact: true })
  await filter.click()
  await expect(filter).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByRole('heading', { name: 'Web Application Development' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Brand Identity Design', exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: 'All Projects', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Brand Identity Design', exact: true })).toBeVisible()
})

test('preview traps focus and Escape returns it', async ({ page }) => {
  await page.goto('/portfolio', { waitUntil: 'domcontentloaded' })
  const trigger = page.getByRole('button', { name: 'Preview Brand Identity Design' })
  await expect(trigger).toBeEnabled()
  await trigger.focus()
  await page.keyboard.press('Enter')
  const dialog = page.getByRole('dialog', { name: 'Brand Identity Design' })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('img', { name: /brand stationery/i })).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Close image preview' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(dialog.getByRole('button', { name: 'Close image preview' })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
})

test('shows touch-friendly project information and existing case studies', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/portfolio', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { name: 'Brand Identity Design', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: /Donor Materials That Match on Every Channel/ })).toHaveAttribute('href', '/case-studies/islamic-relief-donor-materials')
  await page.getByRole('button', { name: 'Web Development', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Web Application Development' })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})

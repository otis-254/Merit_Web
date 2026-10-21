import { test, expect, type Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, route => route.abort())
})

async function fillRequired(page: Page) {
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Test Client')
  await page.getByRole('textbox', { name: 'Email', exact: true }).fill('client@example.test')
  await page.getByRole('combobox', { name: 'Service Interested In' }).selectOption('branding')
  await page.getByRole('textbox', { name: 'Message', exact: true }).fill('A sufficiently detailed test message.')
}

test('makes contact destinations actionable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/contact', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('link', { name: 'meritmediapro007@gmail.com' })).toHaveAttribute('href', 'mailto:meritmediapro007@gmail.com')
  await expect(page.getByRole('link', { name: /714-531 574/ })).toHaveAttribute('href', 'tel:+254714531574')
  await expect(page.getByRole('link', { name: 'Roysambu, Nairobi' })).toHaveAttribute('href', /Roysambu/i)
  await expect(page.locator('main a[href="#"]')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Send Message' })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})

test('preserves input and announces an unsuccessful submission', async ({ page }) => {
  await page.route('**/api/contact', route => route.fulfill({ status: 500, json: { error: 'Unavailable' } }))
  await page.goto('/contact', { waitUntil: 'domcontentloaded' })
  await fillRequired(page)
  await page.getByRole('button', { name: 'Send Message' }).click()
  await expect(page.locator('main').getByRole('alert')).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Name', exact: true })).toHaveValue('Test Client')
  await expect(page.getByText('Message Sent Successfully!')).toHaveCount(0)
})

test('associates validation errors with their fields', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'domcontentloaded' })
  await page.getByRole('button', { name: 'Send Message' }).click()
  const name = page.getByRole('textbox', { name: 'Name', exact: true })
  await expect(name).toHaveAttribute('aria-invalid', 'true')
  const errorId = await name.getAttribute('aria-describedby')
  expect(errorId).toBeTruthy()
  await expect(page.locator(`[id="${errorId}"]`)).toContainText('Name is required')
})

test('announces pending and successful submission', async ({ page }) => {
  let release!: () => void
  const pending = new Promise<void>(resolve => { release = resolve })
  await page.route('**/api/contact', async route => {
    await pending
    await route.fulfill({ status: 200, json: { success: true } })
  })
  await page.goto('/contact', { waitUntil: 'domcontentloaded' })
  await fillRequired(page)
  await page.getByRole('button', { name: 'Send Message' }).click()
  await expect(page.getByRole('button', { name: 'Sending...' })).toBeDisabled()
  await expect(page.getByRole('textbox', { name: 'Name', exact: true })).toBeDisabled()
  await expect(page.getByRole('status')).toContainText('Sending')
  release()
  const dialog = page.getByRole('dialog', { name: 'Message Sent Successfully!' })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Close' })).toBeFocused()
  await dialog.getByRole('button', { name: 'Close' }).click()
  await expect(page.getByRole('textbox', { name: 'Name', exact: true })).toHaveValue('')
})

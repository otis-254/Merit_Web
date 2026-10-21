import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, route => route.abort())
})

test('AI orb stays gently animated while idle and becomes more alert while listening', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/contact', { waitUntil: 'networkidle' })

  const triggerOrb = page.getByRole('button', { name: 'Open AI assistant' }).getByRole('img', { name: 'Merit AI is idle' })
  await expect(triggerOrb).toBeVisible()
  const idleOrbSurface = triggerOrb.locator('xpath=..')
  await expect(idleOrbSurface.locator('canvas')).toBeVisible()

  await page.getByRole('button', { name: 'Open AI assistant' }).click()
  const listeningOrb = page.getByRole('region', { name: 'Merit AI assistant' }).getByRole('img', { name: 'Merit AI is listening' })
  await expect(listeningOrb).toBeVisible()
  const listeningOrbSurface = listeningOrb.locator('xpath=..')
  await expect(listeningOrbSurface.locator('canvas')).toBeVisible()
})

test('AI assistant shows its listening, thinking, streaming, and done moods while replying', async ({ page }) => {
  let releaseResponse!: () => void
  const responseReady = new Promise<void>(resolve => { releaseResponse = resolve })

  await page.route('**/api/chat', async route => {
    await responseReady
    await route.fulfill({
      contentType: 'application/x-ndjson',
      body: '{"delta":"I can help you plan your next project."}\n{"done":true}\n',
    })
  })
  await page.goto('/contact', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Open AI assistant' }).click()
  const assistant = page.getByRole('region', { name: 'Merit AI assistant' })
  await expect(assistant.getByRole('img', { name: 'Merit AI is listening' })).toBeVisible()

  await assistant.getByRole('textbox', { name: 'Message Merit AI' }).fill('Can you help?')
  await assistant.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(assistant.getByRole('img', { name: 'Merit AI is thinking' })).toBeVisible()
  await expect(assistant.getByRole('status')).toContainText('Thinking')

  releaseResponse()
  await expect(page.getByText('I can help you plan your next project.')).toBeVisible()
  await expect(assistant.getByRole('img', { name: 'Merit AI is done' })).toBeVisible()
})

test('AI assistant shows its error mood when the response cannot be loaded', async ({ page }) => {
  await page.route('**/api/chat', route => route.fulfill({ status: 503, json: { error: 'AI assistant is not configured yet.' } }))
  await page.goto('/portfolio', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Open AI assistant' }).click()
  const assistant = page.getByRole('region', { name: 'Merit AI assistant' })
  await expect(assistant).toBeVisible()
  await assistant.getByRole('textbox', { name: 'Message Merit AI' }).fill('Hello')
  await assistant.getByRole('button', { name: 'Send message', exact: true }).click()

  await expect(assistant.getByRole('alert')).toContainText('AI assistant is not configured yet.')
  await expect(assistant.getByRole('img', { name: 'Merit AI is unavailable' })).toBeVisible()
})

test('AI assistant restores a completed conversation after a page reload', async ({ page }) => {
  await page.route('**/api/chat', route => route.fulfill({
    contentType: 'application/x-ndjson',
    body: '{"delta":"Your chat is saved on this device."}\n{"done":true}\n',
  }))
  await page.goto('/contact', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Open AI assistant' }).click()
  const assistant = page.getByRole('region', { name: 'Merit AI assistant' })
  await assistant.getByRole('textbox', { name: 'Message Merit AI' }).fill('Please remember this chat')
  await assistant.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(assistant.getByText('Your chat is saved on this device.')).toBeVisible()

  await page.reload({ waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Open AI assistant' }).click()
  const restoredAssistant = page.getByRole('region', { name: 'Merit AI assistant' })
  await expect(restoredAssistant.getByText('Please remember this chat')).toBeVisible()
  await expect(restoredAssistant.getByText('Your chat is saved on this device.')).toBeVisible()
})

import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  timeout: 60000,
  expect: { timeout: 10000 },
  use: {
    baseURL: 'http://127.0.0.1:3218',
    browserName: 'chromium',
    actionTimeout: 20000,
    launchOptions: process.env.PLAYWRIGHT_CHROME
      ? { executablePath: process.env.PLAYWRIGHT_CHROME }
      : {},
  },
  webServer: {
    command: 'npm run dev -- --hostname 127.0.0.1 --port 3218',
    url: 'http://127.0.0.1:3218',
    reuseExistingServer: false,
    timeout: 120000,
  },
})

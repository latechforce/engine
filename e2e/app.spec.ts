import { expect, test } from './fixtures'
import fs from 'fs'

test.describe('GET /', () => {
  test('should return the home page', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp()

    // WHEN
    await page.goto('/')

    // THEN
    await expect(page).toHaveScreenshot()
  })
})

test.describe('env', () => {
  test('should start with a custom PORT', async ({ startExampleApp }) => {
    // GIVEN
    const port = '54321'

    // WHEN
    const page = await startExampleApp({
      env: {
        PORT: port,
      },
    })
    await page.goto('/')

    // THEN
    expect(page.url()).toContain(port)
  })

  test('should start with a custom sqlite DATABASE_URL', async ({ startExampleApp }) => {
    // GIVEN
    const dbPath = './tmp/test.db'

    // WHEN
    await startExampleApp({
      env: {
        DATABASE_URL: dbPath,
      },
    })

    // THEN
    expect(fs.existsSync(dbPath)).toBe(true)
  })
})

test.describe('GET /api/health', () => {
  test('should return 200', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp()

    // WHEN
    const response = await page.request.get('/api/health')

    // THEN
    expect(response.status()).toBe(200)
  })

  test('should return OK', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp()

    // WHEN
    const response = await page.request.get('/api/health')

    // THEN
    expect(await response.text()).toBe('OK')
  })
})

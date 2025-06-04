import { expect, test } from '@/e2e/fixtures'
import fs from 'fs'

test('should start with a custom PORT', async ({ startExampleApp }) => {
  // GIVEN
  const { page, env } = await startExampleApp({ test, filter: 'port' })

  // WHEN
  await page.goto('/')

  // THEN
  expect(page.url()).toContain(env.PORT)
})

test('should start with a custom sqlite DATABASE_URL', async ({ startExampleApp }, testInfo) => {
  if (!testInfo.project.name.includes('sqlite')) return

  // WHEN
  const { env } = await startExampleApp({ test, filter: 'database/sqlite' })

  // THEN
  const exist = fs.existsSync(env.DATABASE_URL!)
  expect(exist).toBe(true)
})

test('should start with a custom postgres DATABASE_URL', async ({ startExampleApp }, testInfo) => {
  if (!testInfo.project.name.includes('postgres')) return

  // WHEN
  const call = async () => startExampleApp({ test, filter: 'database/postgres' })

  await expect(call()).resolves.not.toThrow()
})

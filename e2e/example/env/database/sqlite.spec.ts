import { expect, test } from '@/e2e/fixtures'
import fs from 'fs'

test('should start with a custom sqlite DATABASE_URL', async ({ startExampleApp }) => {
  // GIVEN
  const { env } = await startExampleApp({ test })

  // WHEN
  const exist = fs.existsSync(env.DATABASE_URL!)

  // THEN
  expect(exist).toBe(true)
})

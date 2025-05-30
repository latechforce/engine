import { expect, test } from '@/e2e/fixtures'
import fs from 'fs'

test('should start with a custom sqlite DATABASE_URL', async ({ startExampleApp }) => {
  // WHEN
  const { env } = await startExampleApp({ test })

  // THEN
  const exist = fs.existsSync(env.DATABASE_URL!)
  expect(exist).toBe(true)
})

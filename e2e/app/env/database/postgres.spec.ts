import { expect, test } from '@/e2e/fixtures'

test('should start with a custom postgres DATABASE_URL', async ({ startExampleApp }, testInfo) => {
  if (!testInfo.project.name.includes('postgres')) return

  // WHEN
  const call = async () => startExampleApp({ test })

  await expect(call()).resolves.not.toThrow()
})

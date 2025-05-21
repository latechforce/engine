import { expect, test } from '@/e2e/fixtures'

test('should start with a custom PORT', async ({ startExampleApp }) => {
  // GIVEN
  const { page, env } = await startExampleApp({ test })

  // WHEN
  await page.goto('/')

  // THEN
  expect(page.url()).toContain(env.PORT)
})

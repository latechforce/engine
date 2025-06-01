import { expect, test } from '@/e2e/fixtures'

// TODO: [@thomas-jeanneau] - should run a split into paths paths action
test.skip('should run a split into paths paths action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automations/run-paths')

  // THEN
  const data = await response.json()
  expect(data).toBe(true)
})

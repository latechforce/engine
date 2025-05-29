import { expect, test } from '@/e2e/fixtures'

// TODO: [@thomas-jeanneau] - should run a only continue if filter action
test.skip('should run a only continue if filter action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automations/run-filter')

  // THEN
  const data = await response.json()
  expect(data).toBe(true)
})

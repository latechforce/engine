import { expect, test } from '@/e2e/fixtures'

test('should run a split into paths paths action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automations/run-paths', {
    data: {
      name: 'John Doe',
    },
  })

  // THEN
  const { data } = await response.json()
  expect(data.path1[0].canContinue).toBe(true)
  expect(data.path2[0].canContinue).toBe(false)
})

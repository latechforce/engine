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
  expect(data.path1.success).toBe(true)
  expect(data.path2).toBeUndefined()
})

test('should run a split into paths paths action with 2 valid paths', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automations/run-paths', {
    data: {
      name: 'John & Jane Doe',
    },
  })

  // THEN
  const { data } = await response.json()
  expect(data.path1.success).toBe(true)
  expect(data.path2.success).toBe(true)
})

test('should run a split into paths paths action before another action', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'before-action' })

  // WHEN
  const response = await page.request.post('/api/automations/run-paths', {
    data: {
      name: 'John Doe',
    },
  })

  // THEN
  const { data } = await response.json()
  expect(data.success).toBe(true)
})

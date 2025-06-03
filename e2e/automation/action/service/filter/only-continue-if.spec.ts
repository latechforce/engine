import { expect, test } from '@/e2e/fixtures'

test('should not run an action if the filter returns false', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automations/run-filter')

  // THEN
  const { data } = await response.json()
  expect(data.canContinue).toBe(false)
})

test('should run an action if the filter returns true', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automations/run-filter', {
    data: {
      name: 'John Doe',
    },
  })

  // THEN
  const { data } = await response.json()
  expect(data.continue).toBe(true)
})

test('should run an exists filter action that returns true', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'exists' })

  // WHEN
  const response = await page.request.post('/api/automations/run-filter', {
    data: {
      name: 'John Doe',
    },
  })

  // THEN
  const { data } = await response.json()
  expect(data.canContinue).toBe(true)
})

test('should run an exists filter action that returns false', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'exists' })

  // WHEN
  const response = await page.request.post('/api/automations/run-filter')

  // THEN
  const { data } = await response.json()
  expect(data.canContinue).toBe(false)
})

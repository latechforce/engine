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

test('should run an and filter action that returns true', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'and' })

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

test('should run an and filter action that returns false', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'and' })

  // WHEN
  const response = await page.request.post('/api/automations/run-filter', {
    data: {
      name: 'Jane Doe',
    },
  })

  // THEN
  const { data } = await response.json()
  expect(data.canContinue).toBe(false)
})

test('should run an or filter action that returns true', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'or' })

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

test('should run an or filter action that returns false', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'or' })

  // WHEN
  const response = await page.request.post('/api/automations/run-filter', {
    data: {
      name: 'Jane Doe',
    },
  })

  // THEN
  const { data } = await response.json()
  expect(data.canContinue).toBe(true)
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

test('should run an does-not-exist filter action that returns true', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'does-not-exist' })

  // WHEN
  const response = await page.request.post('/api/automations/run-filter', {
    data: {
      name: 'John Doe',
    },
  })

  // THEN
  const { data } = await response.json()
  expect(data.canContinue).toBe(false)
})

test('should run an does-not-exist filter action that returns false', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'does-not-exist' })

  // WHEN
  const response = await page.request.post('/api/automations/run-filter')

  // THEN
  const { data } = await response.json()
  expect(data.canContinue).toBe(true)
})

test('should run an is-true filter action that returns true', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'is-true' })

  // WHEN
  const response = await page.request.post('/api/automations/run-filter', {
    data: {
      is_active: true,
    },
  })

  // THEN
  const { data } = await response.json()
  expect(data.canContinue).toBe(true)
})

test('should run an is-true filter action that returns false', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'is-true' })

  // WHEN
  const response = await page.request.post('/api/automations/run-filter')

  // THEN
  const { data } = await response.json()
  expect(data.canContinue).toBe(false)
})

test('should run an is-false filter action that returns true', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'is-false' })

  // WHEN
  const response = await page.request.post('/api/automations/run-filter', {
    data: {
      is_active: false,
    },
  })

  // THEN
  const { data } = await response.json()
  expect(data.canContinue).toBe(true)
})

test('should run an is-false filter action that returns false', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'is-false' })

  // WHEN
  const response = await page.request.post('/api/automations/run-filter')

  // THEN
  const { data } = await response.json()
  expect(data.canContinue).toBe(false)
})

test('should run an contains filter action that returns true', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'contains' })

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

test('should run an contains filter action that returns false', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'contains' })

  // WHEN
  const response = await page.request.post('/api/automations/run-filter', {
    data: {
      name: 'Jane Doe',
    },
  })

  // THEN
  const { data } = await response.json()
  expect(data.canContinue).toBe(false)
})

test('should run an does-not-contain filter action that returns true', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'does-not-contain' })

  // WHEN
  const response = await page.request.post('/api/automations/run-filter', {
    data: {
      name: 'John Doe',
    },
  })

  // THEN
  const { data } = await response.json()
  expect(data.canContinue).toBe(false)
})

test('should run an does-not-contain filter action that returns false', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'does-not-contain' })

  // WHEN
  const response = await page.request.post('/api/automations/run-filter', {
    data: {
      name: 'Jane Doe',
    },
  })

  // THEN
  const { data } = await response.json()
  expect(data.canContinue).toBe(true)
})

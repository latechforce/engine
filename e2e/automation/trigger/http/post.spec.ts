import { expect, test } from '@/e2e/fixtures'

test('should not found the automation with a get request', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.get('/api/automations/post')

  // THEN
  expect(response.status()).toBe(404)
})

test('should not found the automation with a wrong path', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automations/wrong-path')

  // THEN
  expect(response.status()).toBe(404)
})

test('should trigger an automation', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automations/post')

  // THEN
  expect(response.status()).toBe(200)
  const { success } = await response.json()
  expect(success).toBe(true)
})

test('should trigger an automation with immediate response', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'respond-immediately', test })

  // WHEN
  const response = await page.request.post('/api/automations/post')

  // THEN
  expect(response.status()).toBe(200)
  const { success } = await response.json()
  expect(success).toBe(true)
})

test('should not trigger an automation with a invalid body', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'request-body', test })

  // WHEN
  const response = await page.request.post('/api/automations/post', {
    data: {
      date: '2021-01-01',
    },
  })

  // THEN
  expect(response.status()).toBe(400)
  const { error, success } = await response.json()
  expect(error).toBe('Invalid body')
  expect(success).toBe(false)
})

test('should trigger an automation with a valid object body', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'request-body', test })

  // WHEN
  const response = await page.request.post('/api/automations/post', {
    data: {
      name: 'John Doe',
    },
  })

  // THEN
  const data = await response.json()
  expect(data.message).toBe('Hello, John Doe!')
})

test('should trigger an automation with a valid array body', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'request-body', test })

  // WHEN
  const response = await page.request.post('/api/automations/post', {
    data: [
      {
        name: 'John Doe',
      },
      {
        name: 'Jane Dae',
      },
      {
        name: 'Jacob Doe',
      },
    ],
  })

  // THEN
  const { data } = await response.json()
  expect(data[0].message).toBe('Hello, John Doe!')
  expect(data[1].message).toBe('Hello, Jane Dae!')
  expect(data[2].message).toBe('Hello, Jacob Doe!')
})

test('should trigger an automation with a valid array body and respond immediately', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'request-body-respond-immediately', test })

  // WHEN
  const response = await page.request.post('/api/automations/post', {
    data: [
      {
        name: 'John Doe',
      },
      {
        name: 'Jane Dae',
      },
      {
        name: 'Jacob Doe',
      },
    ],
  })

  // THEN
  const { data } = await response.json()
  expect(data[0].success).toBe(true)
  expect(data[1].success).toBe(true)
  expect(data[2].success).toBe(true)
})

test('should trigger an automation with form data', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'request-body', test })

  // WHEN
  const response = await page.request.post('/api/automations/post', {
    form: {
      name: 'John Doe',
    },
  })

  // THEN
  const data = await response.json()
  expect(data.message).toBe('Hello, John Doe!')
})

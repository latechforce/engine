import { expect, test } from '@/e2e/fixtures'

test('should create a record from an automation', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  const response = await page.request.post('/api/automations/create-record')

  // THEN
  expect(response.status()).toBe(200)
  const { data } = await response.json()
  expect(data).toEqual({
    id: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    archivedAt: null,
    fields: {
      name: 'John Doe',
    },
  })
  const { record } = await page.request
    .get(`/api/tables/users/${data.id}`)
    .then((res) => res.json())
  expect(record).toStrictEqual({
    id: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    archivedAt: null,
    fields: {
      name: 'John Doe',
    },
  })
})

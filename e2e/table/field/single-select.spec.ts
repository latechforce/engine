import { expect, test } from '@/e2e/fixtures'

test('should create a record with a single select field', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })
  const country = 'France'

  // WHEN
  const response = await page.request.post('/api/tables/Contacts', {
    data: {
      fields: {
        Country: country,
      },
    },
  })

  // THEN
  const { record } = await response.json()
  expect(record.fields).toEqual({
    Country: country,
  })
})

test('should not create a record with an invalid single select field', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test })
  const country = 'Unknown'

  // WHEN
  const response = await page.request.post('/api/tables/Contacts', {
    data: {
      fields: {
        Country: country,
      },
    },
  })

  // THEN
  expect(response.status()).toBe(400)
  const { error } = await response.json()
  expect(error).toBe('Invalid record')
})

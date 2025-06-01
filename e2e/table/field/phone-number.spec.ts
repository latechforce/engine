import { expect, test } from '@/e2e/fixtures'

test('should create a record with a single line text field', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })
  const phoneNumber = '+33612345678'

  // WHEN
  const response = await page.request.post('/api/tables/Contacts', {
    data: {
      fields: {
        'Phone number': phoneNumber,
      },
    },
  })

  // THEN
  const { record } = await response.json()
  expect(record.fields).toEqual({
    'Phone number': phoneNumber,
  })
})

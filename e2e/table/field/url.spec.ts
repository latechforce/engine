import { expect, test } from '@/e2e/fixtures'

test('should create a record with a single line text field', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })
  const url = 'https://example.com'

  // WHEN
  const response = await page.request.post('/api/tables/Contacts', {
    data: {
      fields: {
        URL: url,
      },
    },
  })

  // THEN
  const { record } = await response.json()
  expect(record.fields).toEqual({
    URL: url,
  })
})

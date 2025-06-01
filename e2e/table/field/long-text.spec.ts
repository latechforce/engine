import { expect, test } from '@/e2e/fixtures'

test('should create a record with a long text field', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })
  const longText = 'Hello, world!'.repeat(100)

  // WHEN
  const response = await page.request.post('/api/tables/Contacts', {
    data: {
      fields: {
        Message: longText,
      },
    },
  })

  // THEN
  const { record } = await response.json()
  expect(record.fields).toEqual({
    Message: longText,
  })
})

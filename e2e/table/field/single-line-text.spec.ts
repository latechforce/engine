import { expect, test } from '@/e2e/fixtures'

test('should create a record with a single line text field', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })
  const text = 'Hello, world!'

  // WHEN
  const response = await page.request.post('/api/tables/Contacts', {
    data: {
      fields: {
        Name: text,
      },
    },
  })

  // THEN
  const { record } = await response.json()
  expect(record.fields).toEqual({
    Name: text,
  })
})

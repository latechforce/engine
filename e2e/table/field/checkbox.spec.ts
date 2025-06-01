import { expect, test } from '@/e2e/fixtures'

test('should create a record with a checkbox field', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })
  const checked = true

  // WHEN
  const response = await page.request.post('/api/tables/Contacts', {
    data: {
      fields: {
        Checkbox: checked,
      },
    },
  })

  // THEN
  const { record } = await response.json()
  expect(record.fields).toEqual({
    Checkbox: checked,
  })
})

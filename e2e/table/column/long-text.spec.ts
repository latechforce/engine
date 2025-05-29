import { expect, test } from '@/e2e/fixtures'

// TODO: [@thomas-jeanneau] - should create a row with a long text column
test.skip('should create a row with a long text column', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })
  const longText = 'Hello, world!'.repeat(100)

  // WHEN
  const response = await page.request.post('/api/table/My table', {
    data: {
      'My field': longText,
    },
  })
  const data = await response.json()

  // THEN
  expect(data.fields).toEqual({
    'My field': longText,
  })
})

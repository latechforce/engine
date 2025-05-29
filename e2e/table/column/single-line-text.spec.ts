import { expect, test } from '@/e2e/fixtures'

// TODO: [@thomas-jeanneau] - should create a row with a single line text column
test.skip('should create a row with a single line text column', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })
  const text = 'Hello, world!'

  // WHEN
  const response = await page.request.post('/api/table/My table', {
    data: {
      'My field': text,
    },
  })
  const data = await response.json()

  // THEN
  expect(data.fields).toEqual({
    'My field': text,
  })
})

import { expect, test } from '@/e2e/fixtures'

test.describe('POST /api/table/:name', () => {
  test.skip('should create a record with a long text field', async ({ startExampleApp }) => {
    // GIVEN
    const { page } = await startExampleApp()
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
})

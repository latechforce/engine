import { expect, test } from '@/e2e/fixtures'

test.describe('POST /api/table/:name', () => {
  test.skip('should create a record with a long text field', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp({ filter: 'table/field/single-line-text' })
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
})

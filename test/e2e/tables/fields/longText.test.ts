import { test, expect, NodeApp } from '@test/fixtures'
import { type Config } from '@latechforce/engine'

test('should create a record with a long text field', async ({ request }) => {
  // GIVEN
  const description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  const config: Config = {
    name: 'App',
    tables: [
      {
        name: 'leads',
        fields: [
          {
            name: 'description',
            field: 'LongText',
          },
        ],
      },
    ],
  }
  const app = new NodeApp()
  const { url } = await app.start(config)

  // WHEN
  const res = await request.post(`${url}/api/table/leads`, {
    data: { description },
  })

  // THEN
  expect(res.ok()).toBeTruthy()
  const { record } = await res.json()
  expect(record.fields.description).toBe(description)
})

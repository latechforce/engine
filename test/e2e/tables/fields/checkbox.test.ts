import { test, expect, NodeApp } from '@test/fixtures'
import Database from '@test/drivers/database'
import { type Config } from '@latechforce/engine'

Database.each(test, (dbConfig) => {
  test('should create a record with a checkbox field', async ({ request }) => {
    // GIVEN
    const database = new Database(dbConfig)
    const config: Config = {
      name: 'App',
      tables: [
        {
          name: 'scores',
          fields: [
            {
              name: 'valid',
              field: 'Checkbox',
            },
          ],
        },
      ],
      database: dbConfig,
    }
    const app = new NodeApp()
    const { url } = await app.start(config)

    // WHEN
    await request.post(`${url}/api/table/scores`, { data: { valid: true } })

    // THEN
    const record = await database
      .table('scores', [{ name: 'score', type: 'BOOLEAN' }])
      .read({ field: 'valid', operator: 'IsTrue' })
    expect(record?.fields.valid).toBeTruthy()
  })
})

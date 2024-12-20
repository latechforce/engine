import { test, expect } from '@tests/fixtures'
import App, { type Config } from '@latechforce/engine'
import Database from '@tests/drivers/database'
import Queue from '@tests/drivers/queue'

test.describe('RecordCreated trigger', () => {
  Database.each(test, (dbConfig) => {
    test('should start an automation when a record is created', async () => {
      // GIVEN
      const database = new Database(dbConfig)
      const queue = new Queue(database)
      const config: Config = {
        name: 'App',
        automations: [
          {
            name: 'Send email',
            trigger: {
              service: 'Database',
              event: 'RecordCreated',
              table: 'leads',
            },
            actions: [],
          },
        ],
        tables: [
          {
            name: 'leads',
            fields: [
              {
                name: 'name',
                field: 'SingleLineText',
              },
            ],
          },
        ],
        database: dbConfig,
      }
      const app = new App()
      await app.start(config)

      // WHEN
      await database.table('leads').insert({ id: '1', name: 'John', created_at: new Date() })

      // THEN
      await expect(queue.waitForEmpty('Send email', 5000)).resolves.toBeTruthy()
    })
  })
})

import Tester, { expect, describe, it } from 'bun:test'
import { Helpers, type Config } from '/test/bun'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp({ drivers: ['Database'] }, ({ app, request, drivers }) => {
  describe('on POST', () => {
    it('should read a record in database', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'readRecord',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'read-record',
              input: {
                type: 'object',
                properties: {
                  recordId: {
                    type: 'string',
                  },
                },
              },
              output: {
                record: {
                  json: '{{readRecord.record}}',
                },
              },
            },
            actions: [
              {
                service: 'Database',
                action: 'ReadRecord',
                name: 'readRecord',
                table: 'records',
                id: '{{trigger.body.recordId}}',
              },
            ],
          },
        ],
        tables: [
          {
            name: 'records',
            fields: [],
          },
        ],
      }
      const { url } = await app.start(config)
      await drivers.database
        .table({ name: 'records', fields: [] })
        .insert({ id: '1', fields: {}, created_at: new Date().toISOString() })

      // WHEN
      const response = await request.post(`${url}/api/automation/read-record`, {
        recordId: '1',
      })

      // THEN
      expect(response.record.id).toBe('1')
    })
  })
})

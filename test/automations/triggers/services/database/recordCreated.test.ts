import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getAutomationSchema, getFirstTableSchema } from '/test/common'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.request(({ app, drivers }) => {
  describe('on record created', () => {
    it('should start an automation', async () => {
      // GIVEN
      const config = {
        ...getFirstTableSchema(),
        ...getAutomationSchema('FirstDatabaseTableRecordCreated'),
      }
      await app.start(config)

      // WHEN
      await drivers.database.tableFromSchema(config.tables[0]).insert({
        id: '1',
        fields: { name: 'John' },
        created_at: new Date().toISOString(),
      })

      // THEN
      const histories = await drivers.database.waitForAutomationsHistories()
      expect(histories).toHaveLength(1)
      expect(histories[0].trigger_data).toContain('1')
    })
  })
})

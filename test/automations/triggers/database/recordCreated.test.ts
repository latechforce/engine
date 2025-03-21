import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getAutomationConfig, getFirstTableConfig } from '/test/config'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.request(({ app, drivers }) => {
  describe('on record created', () => {
    it('should start an automation', async () => {
      // GIVEN
      const config = {
        ...getFirstTableConfig(),
        ...getAutomationConfig('FirstDatabaseTableRecordCreated'),
      }
      await app.start(config)

      // WHEN
      await drivers.database.table(config.tables[0]).insert({
        id: '1',
        fields: { name: 'John' },
        created_at: new Date().toISOString(),
      })

      // THEN
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const { rows: histories } = await drivers.database.query(
        'SELECT * FROM automations_histories_view'
      )
      expect(histories).toHaveLength(1)
    })
  })
})

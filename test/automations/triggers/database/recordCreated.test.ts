import Tester, { expect, describe, it } from 'bun:test'
import { IntegrationTest } from '@test/integration'
import { getAutomationConfig, getFirstTableConfig } from '@test/config'

new IntegrationTest(Tester).with({ drivers: ['Database'] }, ({ app, drivers }) => {
  describe('on record created', () => {
    it('should start an automation', async () => {
      // GIVEN
      const config = {
        ...getFirstTableConfig(),
        ...getAutomationConfig('FirstTableRecordCreated'),
      }
      await app.start(config)

      // WHEN
      await drivers.database
        .table(config.tables[0])
        .insert({ id: '1', fields: { name: 'John' }, created_at: new Date() })

      // THEN
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const { rows: histories } = await drivers.database.query(
        'SELECT * FROM _automations_histories_view'
      )
      expect(histories).toHaveLength(1)
    })
  })
})

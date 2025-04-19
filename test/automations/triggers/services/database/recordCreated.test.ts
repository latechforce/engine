import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configAutomationTriggerServiceDatabaseRecordCreated } from '/examples/config/automation/trigger/service/database/recordCreated'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.request(({ app, drivers }) => {
  describe('on record created', () => {
    it('should start an automation', async () => {
      // GIVEN
      await app.start(configAutomationTriggerServiceDatabaseRecordCreated)

      // WHEN
      await drivers.database
        .tableFromSchema(configAutomationTriggerServiceDatabaseRecordCreated.tables![0])
        .insert({
          id: '1',
          fields: {},
          created_at: new Date().toISOString(),
        })

      // THEN
      const histories = await drivers.database.waitForAutomationsHistories()
      expect(histories).toHaveLength(1)
      expect(histories[0].trigger_data).toContain('1')
    })
  })
})

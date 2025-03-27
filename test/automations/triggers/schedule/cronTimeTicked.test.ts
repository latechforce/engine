import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getAutomationConfig } from '/test/config'
import type { AutomationHistoryRecord } from '/domain/entities/Automation/History'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.request(({ app, drivers }) => {
  describe('on cron time ticked', () => {
    it('should start an automation', async () => {
      // GIVEN
      const config = getAutomationConfig('CronTimeTicked')
      await app.start(config)

      // WHEN
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // THEN
      const { rows: histories } = await drivers.database.query<AutomationHistoryRecord>(
        'SELECT * FROM automations_histories_view'
      )
      expect(histories.length).toBeGreaterThan(0)
      expect(histories[0].status).toBe('succeed')
    })
  })
})

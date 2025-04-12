import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getAutomationSchema } from '/test/common'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.request(({ app, drivers }) => {
  describe('on cron time ticked', () => {
    it('should start an automation', async () => {
      // GIVEN
      const config = getAutomationSchema('CronTimeTicked')
      await app.start(config)

      // WHEN
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // THEN
      const histories = await drivers.database.waitForAutomationsHistories()
      expect(histories.length).toBeGreaterThan(0)
      expect(histories[0].status).toBe('succeed')
    })
  })
})

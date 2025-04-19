import BunTester, { expect, describe, it } from 'bun:test'
import { Mock } from '/infrastructure/test/bun/Mock'
import { configAutomation } from '/examples/config/automation'
import { configAutomationWithErrorActions } from '/examples/config/automation/withErrorActions'

const mock = new Mock(BunTester, { drivers: ['Database'] })

mock.request(({ app, request, drivers }) => {
  describe('on POST', () => {
    it('should create an automation history', async () => {
      // GIVEN
      const { url } = await app.start(configAutomation)

      // WHEN
      await request.post(`${url}/api/automation/run`)

      // THEN
      const histories = await drivers.database.waitForAutomationsHistories()
      expect(histories).toHaveLength(1)
    })

    it('should fail if the first action fails without running the second action', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationWithErrorActions)

      // WHEN
      await request.post(`${url}/api/automation/run`)

      // THEN
      const [history] = await drivers.database.waitForAutomationsHistories({ status: 'failed' })
      expect(history.status).toBe('failed')
      const actions = JSON.parse(history.actions_data)
      expect(actions.length).toBe(1)
      expect(actions[0].config.name).toBe('firstCodeAction')
      expect(actions[0].output.error).toBe('firstCodeAction')
      expect(actions[1]).toBeUndefined()
    })
  })
})

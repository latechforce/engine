import Tester, { expect, describe, it, beforeEach } from 'bun:test'
import { Mock } from '/test/bun'
import { configAutomationTriggerIntegrationJotformFormWebhookReceived } from '/examples/config/automation/trigger/integration/jotform/formWebhookReceived'

const mock = new Mock(Tester, { drivers: ['Database'], integrations: ['Jotform'] })

mock.request(({ app, drivers }) => {
  describe.skip('on form webhook received', () => {
    beforeEach(async () => {
      // Add form-specific setup here
    })

    it('should start an automation', async () => {
      // GIVEN
      await app.start(configAutomationTriggerIntegrationJotformFormWebhookReceived)

      // WHEN
      // Add form-specific trigger test here

      // THEN
      const histories = await drivers.database.waitForAutomationsHistories()
      expect(histories).toHaveLength(1)
    })
  })
})

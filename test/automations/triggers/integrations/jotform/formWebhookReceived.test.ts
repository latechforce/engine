import Tester, { expect, it, beforeEach, describe } from 'bun:test'
import { Mock } from '/test/bun'
import { configAutomationTriggerIntegrationJotformFormWebhookReceived } from '/examples/config/automation/trigger/integration/jotform/formWebhookReceived'
import env from '/infrastructure/test/env'

const mock = new Mock(Tester, { drivers: ['Database'], integrations: ['Jotform'] })

mock.request(({ app, drivers, integrations }) => {
  describe('on form webhook received', () => {
    beforeEach(async () => {
      // Add form-specific setup here
    })

    it('should start an automation', async () => {
      // GIVEN
      await app.start(configAutomationTriggerIntegrationJotformFormWebhookReceived)

      // WHEN
      // Add form-specific trigger test here
      const formId = env.TEST_JOTFORM_FORM_ID
      const currentWebhooksResponse = await integrations.jotform.listWebhooks(formId)
      if (currentWebhooksResponse.error) {
        throw new Error('Jotform username is not configured')
      }
      const currentWebhooks = currentWebhooksResponse.data.content
      const webhookUrl = currentWebhooks['0']

      if (!webhookUrl) {
        throw new Error('No webhook found')
      }

      await fetch(webhookUrl, {
        method: 'POST',
        body: JSON.stringify({
          rawRequest: {
            test: 'test',
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      // THEN
      const histories = await drivers.database.waitForAutomationsHistories()
      expect(histories).toHaveLength(1)
    })
  })
})

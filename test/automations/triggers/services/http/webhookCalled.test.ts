import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configAutomationTriggerServiceHttpWebhookCalled } from '/examples/config/automation/trigger/service/http/webhookCalled'
import { configAutomationTriggerServiceHttpWebhookCalledAuth } from '/examples/config/automation/trigger/service/http/webhookCalled/auth'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on POST', () => {
    it('should run an automation', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationTriggerServiceHttpWebhookCalled)

      // WHEN
      const response = await request.post(`${url}/api/webhook/run`)

      // THEN
      expect(response.success).toBeTruthy()
    })

    it('should not run an automation with auth', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationTriggerServiceHttpWebhookCalledAuth)

      // WHEN
      const response = await request.post(`${url}/api/webhook/run`)

      // THEN
      expect(response.error).toBe('Unauthorized: Invalid API Key')
    })

    it('should run an automation with auth', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationTriggerServiceHttpWebhookCalledAuth)

      // WHEN
      const response = await request.post(
        `${url}/api/webhook/run`,
        {},
        {
          headers: {
            'x-api-key': 'test-key',
          },
        }
      )

      // THEN
      expect(response.success).toBeTruthy()
    })
  })
})

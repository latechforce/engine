import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getAutomationConfig } from '/test/config'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on POST', () => {
    it('should run an automation', async () => {
      // GIVEN
      const config = getAutomationConfig('WebhookCalled')
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/webhook/run`)

      // THEN
      expect(response.success).toBeTruthy()
    })

    it('should not run an automation with auth', async () => {
      // GIVEN
      const config = getAutomationConfig('WebhookCalledWithApiKeyAuth')
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/webhook/run`)

      // THEN
      expect(response.error).toBe('Unauthorized: Invalid API Key')
    })

    it('should run an automation with auth', async () => {
      // GIVEN
      const config = getAutomationConfig('WebhookCalledWithApiKeyAuth')
      const { url } = await app.start(config)

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

import type { IJotformIntegration } from '/adapter/spi/integrations/JotformSpi'
import type BunTester from 'bun:test'
import { assertIsDefined } from '/test/common'
import env from '/test/env'

export function testJotformIntegration(
  { describe, it, expect }: typeof BunTester,
  integration: IJotformIntegration
) {
  describe('JotformIntegration', () => {
    it('should be able to test connection', async () => {
      // WHEN
      const result = await integration.testConnection()

      // THEN
      expect(result).toBeUndefined()
    })

    describe('Webhooks', () => {
      it('should list webhooks for a form', async () => {
        // WHEN
        const formId = env.TEST_JOTFORM_FORM_ID
        const result = await integration.listWebhooks(formId)

        // THEN
        expect(result.data).toBeDefined()
        assertIsDefined(result.data)

        expect(result.data.responseCode).toBe(200)
        expect(result.data.message).toBe('success')
        expect(result.data.content).toBeDefined()
      })

      it('should add a webhook to a form', async () => {
        // WHEN
        const params = {
          formId: env.TEST_JOTFORM_FORM_ID,
          webhookUrl: 'http://example.com/webhook',
        }
        const result = await integration.addWebhook(params)

        //THEN
        expect(result.data).toBeDefined()
        assertIsDefined(result.data)

        expect(result.data.responseCode).toBe(200)
        expect(result.data.message).toBe('success')
        expect(Object.values(result.data.content).length).toBe(1)
      })

      it('should delete a webhook', async () => {
        // WHEN
        const params = {
          formId: env.TEST_JOTFORM_FORM_ID,
          webhookId: '0',
        }
        const result = await integration.deleteWebhook(params)

        //THEN
        expect(result.data).toBeDefined()
        assertIsDefined(result.data)

        expect(result.data.responseCode).toBe(200)
        expect(result.data.message).toBe('success')
        expect(Object.values(result.data.content).length).toBe(0)
      })
    })
  })
}

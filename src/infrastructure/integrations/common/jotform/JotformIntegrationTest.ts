import type { IJotformIntegration } from '/adapter/spi/integrations/JotformSpi'
import type BunTester from 'bun:test'

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
        const formId = '123456789'
        const result = await integration.listWebhooks(formId)

        // THEN
        if (!result.data) {
          throw new Error('Expected data to be defined')
        }
        expect(result.data.responseCode).toBe(200)
        expect(result.data.message).toBe('success')
        expect(result.data.content).toBeDefined()
        expect(result.data['limit-left']).toBeDefined()
      })

      it('should add a webhook to a form', async () => {
        // WHEN
        const params = {
          formId: '123456789',
          webhookUrl: 'http://example.com/webhook',
        }
        const result = await integration.addWebhook(params)

        // THEN
        if (!result.data) {
          throw new Error('Expected data to be defined')
        }
        expect(result.data.responseCode).toBe(200)
        expect(result.data.message).toBe('success')
        expect(result.data.content).toBeDefined()
        expect(result.data['limit-left']).toBeDefined()
      })
    })
  })
}

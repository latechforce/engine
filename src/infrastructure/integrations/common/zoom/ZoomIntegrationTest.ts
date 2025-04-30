import type { IZoomIntegration } from '/adapter/spi/integrations/ZoomSpi'
import type BunTester from 'bun:test'

export function testZoomIntegration(
  { describe, it, expect }: typeof BunTester,
  integration: IZoomIntegration
) {
  describe('ZoomIntegration', () => {
    it('should be able to test connection', async () => {
      // WHEN
      const result = await integration.testConnection()

      // THEN
      expect(result).toBeUndefined()
    })

    it('should create an event subscription', async () => {
      // GIVEN
      const params = {
        event_subscription_name: 'Test Subscription',
        event_webhook_url: 'https://example.com/webhook',
        events: ['meeting.ended', 'meeting.started'],
        subscription_scope: 'user' as const,
        subscriber_id: '12345',
        access_token: 'mock-access-token',
      }

      // WHEN
      const result = await integration.createEventSubscription(params)

      // THEN
      expect(result).toBeDefined()
      expect(result.data).toBeDefined()
      if (result.data) {
        expect(result.data.event_subscription_id).toBeDefined()
        expect(result.data.event_subscription_name).toBe(params.event_subscription_name)
        expect(result.data.event_webhook_url).toBe(params.event_webhook_url)
        expect(result.data.events).toEqual(params.events)
        expect(result.data.subscription_scope).toBe(params.subscription_scope)
      }
    })

    it('should delete an event subscription', async () => {
      // GIVEN
      const eventSubscriptionId = 'test-subscription-id'

      // WHEN
      const result = await integration.deleteEventSubscription(eventSubscriptionId)

      // THEN
      expect(result).toBeDefined()
      expect(result.error).toBeUndefined()
      expect(result.data).toBeUndefined()
    })
  })
}

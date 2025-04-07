import type { ICalendlyIntegration } from '/adapter/spi/integrations/CalendlySpi'
import type BunTester from 'bun:test'
import type {
  CalendlyUser,
  CreateWebhookSubscriptionParams,
} from '/domain/integrations/Calendly/CalendlyTypes'
import { assertIsDefined, assertNotNull } from 'shared/utils/assert'

export function testCalendlyIntegration(
  { describe, it, expect }: typeof BunTester,
  integration: ICalendlyIntegration
) {
  describe('CalendlyIntegration', () => {
    it('should be able to check configuration', async () => {
      // WHEN
      const result = await integration.checkConfiguration()

      // THEN
      expect(result).toBeUndefined()
    })

    it('should be able to list webhook subscriptions', async () => {
      // WHEN
      const currentUser = await integration.currentUser()

      expect(currentUser.error).toBeUndefined()

      const result = await integration.listWebhookSubscriptions({
        scope: 'user',
        organization: currentUser.data?.current_organization,
        count: 10,
        user: currentUser.data?.uri,
      })

      // THEN
      expect(result.error).toBeUndefined()
      expect(result.data).toBeDefined()
      if (result.data) {
        expect(Array.isArray(result.data.collection)).toBe(true)
        expect(result.data.pagination).toBeDefined()
        expect(typeof result.data.pagination.count).toBe('number')
      }
    })

    it('should create a webhook subscription', async () => {
      const currentUser = await integration.currentUser()

      expect(currentUser.error).toBeUndefined()
      expect(currentUser.data).toBeDefined()
      expect(currentUser.data?.current_organization).toBeDefined()

      assertIsDefined<CalendlyUser>(currentUser.data)

      // WHEN
      const params: CreateWebhookSubscriptionParams = {
        url: 'https://example.com/webhook',
        events: ['invitee.created'],
        organization: currentUser.data.current_organization,
        user: currentUser.data.uri,
        scope: 'user',
      }
      const result = await integration.createWebhookSubscription(params)

      // THEN
      expect(result.error).toBeUndefined()
      expect(result.data).toBeDefined()
    })

    it('should get a webhook subscription', async () => {
      const currentUser = await integration.currentUser()

      expect(currentUser.error).toBeUndefined()
      expect(currentUser.data).toBeDefined()
      expect(currentUser.data?.current_organization).toBeDefined()

      assertIsDefined<CalendlyUser>(currentUser.data)

      // WHEN
      const createParams: CreateWebhookSubscriptionParams = {
        url: 'https://example.com/webhook',
        events: ['invitee.created'],
        organization: currentUser.data.current_organization,
        user: currentUser.data.uri,
        scope: 'user',
      }
      const created = await integration.createWebhookSubscription(createParams)

      expect(created.data?.uri).toBeDefined()

      const params = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        webhook_uri: created.data.uri,
      }
      const result = await integration.getWebhookSubscription(params)

      // THEN
      expect(result.data).toBeDefined()
      expect(result.data?.resource).toBeDefined()
      expect(result.data?.resource.uri).toBeDefined()
      expect(result.data?.resource.callback_url).toBeDefined()
      expect(result.data?.resource.state).toBeDefined()
    })
  })
}

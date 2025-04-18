import type { ICalendlyIntegration } from '/adapter/spi/integrations/CalendlySpi'
import type BunTester from 'bun:test'
import type {
  CalendlyUser,
  CreateWebhookSubscriptionParams,
  CreateWebhookSubscriptionResponse,
  ListWebhookSubscriptionsResponse,
} from '/domain/integrations/Calendly/CalendlyTypes'
import { assertIsDefined } from '/infrastructure/test/common'

export function testCalendlyIntegration(
  { describe, it, expect, beforeAll }: typeof BunTester,
  integration: ICalendlyIntegration
) {
  let webhookUri: string

  beforeAll(async () => {
    const currentUserData = await integration.currentUser()
    const currentUser = currentUserData.data

    expect(currentUser).toBeDefined()
    assertIsDefined<CalendlyUser>(currentUser)

    const result = await integration
      .listWebhookSubscriptions({
        scope: 'user',
        organization: currentUser.current_organization,
        count: 10,
        user: currentUser.uri,
      })
      .catch(() => ({
        data: {
          collection: [],
        },
      }))
    for (const webhook of result.data?.collection || []) {
      await integration
        .deleteWebhookSubscription({
          webhook_uri: webhook.uri,
        })
        .catch(() => {})
    }
  })

  describe('CalendlyIntegration', () => {
    it('should be able to test connection', async () => {
      // WHEN
      const result = await integration.testConnection()

      // THEN
      expect(result).toBeUndefined()
    })

    it('should create a webhook subscription', async () => {
      // GIVEN
      const currentUser = await integration.currentUser()

      expect(currentUser.error).toBeUndefined()
      expect(currentUser.data).toBeDefined()
      expect(currentUser.data?.current_organization).toBeDefined()

      assertIsDefined<CalendlyUser>(currentUser.data)

      const params: CreateWebhookSubscriptionParams = {
        url: 'https://example.com/webhook',
        events: ['invitee.created'],
        organization: currentUser.data.current_organization,
        user: currentUser.data.uri,
        scope: 'user',
      }

      // WHEN
      const result = await integration.createWebhookSubscription(params)

      // THEN
      expect(result.error).toBeUndefined()
      expect(result.data).toBeDefined()

      assertIsDefined<CreateWebhookSubscriptionResponse>(result.data)

      webhookUri = result.data.uri
    })

    it('should get a webhook subscription', async () => {
      // GIVEN
      const params = {
        webhook_uri: webhookUri,
      }

      // WHEN
      const result = await integration.getWebhookSubscription(params)

      // THEN
      expect(result.data).toBeDefined()
      expect(result.data?.resource).toBeDefined()
      expect(result.data?.resource.uri).toBeDefined()
      expect(result.data?.resource.callback_url).toBeDefined()
      expect(result.data?.resource.state).toBeDefined()
    })

    it('should be able to list webhook subscriptions', async () => {
      // GIVEN
      const currentUserData = await integration.currentUser()
      const currentUser = currentUserData.data

      expect(currentUser).toBeDefined()
      assertIsDefined<CalendlyUser>(currentUser)

      // WHEN
      const result = await integration.listWebhookSubscriptions({
        scope: 'user',
        organization: currentUser.current_organization,
        count: 10,
        user: currentUser.uri,
      })

      // THEN
      expect(result.error).toBeUndefined()
      expect(result.data).toBeDefined()

      assertIsDefined<ListWebhookSubscriptionsResponse>(result.data)

      expect(Array.isArray(result.data.collection)).toBe(true)
      expect(result.data.pagination).toBeDefined()
      expect(typeof result.data.pagination.count).toBe('number')
    })

    it('should delete a webhook subscription', async () => {
      // GIVEN
      const params = {
        webhook_uri: webhookUri,
      }

      // WHEN
      const result = await integration.deleteWebhookSubscription(params)

      // THEN
      expect(result.data).toBeUndefined()
    })
  })
}

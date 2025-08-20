import type { Token } from '../../../../../features/connection/domain/value-object/token.value-object'
import type { LinkedinAdsActionSchema } from './linkedin-ads-action.schema'
import { LinkedinIntegration } from '../linkedin.integration'

export class LinkedinAdsActionIntegration {
  constructor(private readonly schema: LinkedinAdsActionSchema) {}

  async runAction(token: Token): Promise<Record<string, unknown>> {
    const client = new LinkedinIntegration(token.access_token)
    switch (this.schema.action) {
      case 'create-lead-notification-subscription': {
        const { webhook, organizationId, leadType } = this.schema.params
        return client.createLeadNotificationSubscription({
          webhook,
          organizationId,
          leadType,
        })
      }
      case 'list-lead-notification-subscriptions': {
        const { organizationId } = this.schema.params
        return client.listLeadNotificationSubscriptions({ organizationId })
      }
      default: {
        throw new Error('Unhandled LinkedIn action')
      }
    }
  }
}

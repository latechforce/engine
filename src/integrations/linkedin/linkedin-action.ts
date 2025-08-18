import type { Token } from '../../features/connection/domain/value-object/token.value-object'
import type { LinkedinActionSchema } from './linkedin-action.schema'
import { LinkedinIntegration } from './linkedin.integration'

export class LinkedinActionIntegration {
  constructor(private readonly schema: LinkedinActionSchema) {}

  async runAction(token: Token): Promise<Record<string, unknown>> {
    const client = new LinkedinIntegration(token.access_token)
    switch (this.schema.action) {
      case 'create-lead-notification-subscription': {
        const { webhook, organizationId, leadType } = this.schema.params
        const organizationUrn = `urn:li:organization:${organizationId}`
        return client.createLeadNotificationSubscription({
          webhook,
          organizationUrn,
          leadType,
        })
      }
      case 'list-lead-notification-subscriptions': {
        const { organizationId } = this.schema.params
        const organizationUrn = `urn:li:organization:${organizationId}`
        return client.listLeadNotificationSubscriptions({ organizationUrn })
      }
      default: {
        throw new Error('Unhandled LinkedIn action')
      }
    }
  }
}

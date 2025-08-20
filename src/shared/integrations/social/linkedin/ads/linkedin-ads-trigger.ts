import type { Token } from '../../../../../features/connection/domain/value-object/token.value-object'
import type { LinkedinAdsTriggerSchema } from './linkedin-ads-trigger.schema'
import { LinkedinIntegration } from '../linkedin.integration'

export class LinkedinAdsTriggerIntegration {
  constructor(
    private readonly schema: LinkedinAdsTriggerSchema,
    private readonly automationId: number
  ) {}

  async setupTrigger(token: Token, url: string) {
    const client = new LinkedinIntegration(token.access_token)
    switch (this.schema.event) {
      case 'new-lead-gen-form-response': {
        const { organizationId, leadType } = this.schema.params
        // Check if a subscription with this webhook already exists
        const existing = await client.listLeadNotificationSubscriptions({ organizationId })
        const alreadyExists = existing.results?.some((s) => s.webhook === url)
        if (!alreadyExists) {
          await client.createLeadNotificationSubscription({
            webhook: url,
            organizationId,
            leadType: leadType ?? 'SPONSORED',
          })
        }
        break
      }
      default: {
        const _exhaustiveCheck: never = this.schema.event
        throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
      }
    }
  }
}

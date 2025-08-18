import type { Token } from '../../features/connection/domain/value-object/token.value-object'
import type { LinkedinTriggerSchema } from './linkedin-trigger.schema'
import { LinkedinIntegration } from './linkedin.integration'

export class LinkedinTriggerIntegration {
  constructor(
    private readonly schema: LinkedinTriggerSchema,
    private readonly automationId: number
  ) {}

  async setupTrigger(token: Token, url: string) {
    const client = new LinkedinIntegration(token.access_token)
    switch (this.schema.event) {
      case 'new-lead-gen-form-response': {
        const { organizationId, leadType } = this.schema.params
        const organizationUrn = `urn:li:organization:${organizationId}`
        // Check if a subscription with this webhook already exists
        const existing = await client.listLeadNotificationSubscriptions({ organizationUrn })
        const alreadyExists = existing.results?.some((s) => s.webhook === url)
        if (!alreadyExists) {
          await client.createLeadNotificationSubscription({
            webhook: url,
            organizationUrn,
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

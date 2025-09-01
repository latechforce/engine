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
        const { organizationId, sponsoredAccountId, leadType } = this.schema.params
        const actualLeadType = leadType ?? 'SPONSORED'

        // Determine which ID to use for checking existing subscriptions
        const checkId = actualLeadType === 'SPONSORED' ? sponsoredAccountId : organizationId
        if (!checkId) {
          throw new Error(
            actualLeadType === 'SPONSORED'
              ? 'sponsoredAccountId is required for SPONSORED lead type'
              : 'organizationId is required for non-SPONSORED lead type'
          )
        }

        // Check if a subscription with this webhook already exists
        const existing = await client.listLeadNotificationSubscriptions({
          organizationId: checkId,
          sponsoredAccountId: actualLeadType === 'SPONSORED' ? checkId : undefined,
        })
        const alreadyExists = existing.elements.some((s) => s.webhook === url)
        if (!alreadyExists) {
          await client.createLeadNotificationSubscription({
            webhook: url,
            organizationId,
            sponsoredAccountId,
            leadType: actualLeadType,
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

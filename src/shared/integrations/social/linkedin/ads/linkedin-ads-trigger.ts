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

        // Remove duplicate webhooks - keep only the first occurrence of each unique webhook
        const webhookMap = new Map<string, (typeof existing.elements)[0]>()
        const duplicatesToDelete: number[] = []

        for (const element of existing.elements) {
          if (element.webhook) {
            if (webhookMap.has(element.webhook)) {
              // This is a duplicate, mark it for deletion
              duplicatesToDelete.push(element.id)
            } else {
              // First occurrence, keep it
              webhookMap.set(element.webhook, element)
            }
          }
        }

        // Delete duplicate webhooks
        for (const id of duplicatesToDelete) {
          await client.deleteLeadNotificationSubscription(id)
        }

        // Check if current webhook already exists (after deduplication)
        const alreadyExists =
          webhookMap.has(url) ||
          Array.from(webhookMap.keys()).some(
            (webhook) => url.includes(webhook) || webhook.includes(url)
          )

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

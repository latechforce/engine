import type { Token } from '../../features/connection/domain/value-object/token.value-object'
import { CalendlyIntegration } from './calendly.integration'
import type { CalendlyTriggerSchema } from './calendly-trigger.schema'

export class CalendlyTriggerIntegration {
  constructor(
    private readonly schema: CalendlyTriggerSchema,
    private readonly automationId: number
  ) {}

  async setupTrigger(token: Token, url: string) {
    const calendly = new CalendlyIntegration(token.access_token)
    switch (this.schema.event) {
      case 'invite-created': {
        const params = this.schema.inviteCreatedCalendly
        const currentUser = await calendly.getCurrentUser()
        const organization = params?.organization ?? currentUser.resource.current_organization
        const scope = params?.scope ?? 'user'
        const user = scope === 'user' ? currentUser.resource.uri : undefined
        const webhookSubscriptions = await calendly.listWebhookSubscriptions({
          organization,
          scope,
          user,
        })
        const webhookSubscription = webhookSubscriptions.collection.find((subscription) =>
          subscription.callback_url.endsWith(this.automationId.toString())
        )
        if (!webhookSubscription) {
          await calendly.createWebhookSubscription({
            url,
            events: ['invitee.created'],
            organization,
            scope,
            user,
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

import type { Token } from '../../../../features/connection/domain/value-object/token.value-object'
import { CalendlyIntegration } from '../../../../shared/infrastructure/integration/calendly'
import type { CalendlyTriggerSchema } from '../../domain/schema/integration/calendly'

export class CalendlyTriggerIntegration {
  constructor(private readonly schema: CalendlyTriggerSchema) {}

  async setupTrigger(token: Token, url: string) {
    const calendly = new CalendlyIntegration(token.access_token)
    switch (this.schema.event) {
      case 'invite-created': {
        const currentUser = await calendly.getCurrentUser()
        const organization = this.schema.organization ?? currentUser.resource.current_organization
        const scope = this.schema.scope ?? 'user'
        const user = scope === 'user' ? currentUser.resource.uri : undefined
        const webhookSubscriptions = await calendly.listWebhookSubscriptions({
          organization,
          scope,
          user,
        })
        const webhookSubscription = webhookSubscriptions.collection.find((subscription) =>
          subscription.callback_url.includes(this.schema.path)
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

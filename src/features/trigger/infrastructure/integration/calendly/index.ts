import { CalendlyActionIntegration } from '@/action/infrastructure/integration/calendly'
import type { Token } from '@/connection/domain/value-object/token.value-object'
import type { IntegrationTrigger } from '@/trigger/domain/entity/integration-trigger.entity'
import type { BaseIntegration } from '../base'

export class CalendlyTriggerIntegration implements BaseIntegration {
  async setupTrigger(trigger: IntegrationTrigger, token: Token) {
    const { schema } = trigger
    const actions = new CalendlyActionIntegration()
    switch (schema.event) {
      case 'invite-created': {
        const currentUser = await actions.getCurrentUser(token)
        const organization = schema.organization ?? currentUser.resource.current_organization
        const scope = schema.scope ?? 'user'
        const user = scope === 'user' ? currentUser.resource.uri : undefined
        const webhookSubscriptions = await actions.listWebhookSubscriptions(token, {
          organization,
          scope,
          user,
        })
        const webhookSubscription = webhookSubscriptions.collection.find((subscription) =>
          subscription.callback_url.includes(schema.path)
        )
        if (!webhookSubscription) {
          await actions.createWebhookSubscription(token, {
            url: trigger.url,
            events: ['invitee.created'],
            organization,
            scope,
            user,
          })
        }
        break
      }
      default:
        throw new Error(`Unsupported trigger type: ${schema.event}`)
    }
  }
}

import type { Token } from '../../../connection/domain/value-object/token.value-object'
import type { CalendlyActionSchema } from '../../domain/schema/integration/calendly'
import { CalendlyIntegration } from '../../../../shared/infrastructure/integration/calendly'

export class CalendlyActionIntegration {
  constructor(private readonly schema: CalendlyActionSchema) {}

  async runAction(token: Token): Promise<Record<string, unknown>> {
    const calendly = new CalendlyIntegration(token.access_token)
    switch (this.schema.action) {
      case 'list-webhook-subscriptions': {
        const params = this.schema.listWebhookSubscriptionsCalendly
        const currentUser = await calendly.getCurrentUser()
        const organization = params.organization ?? currentUser.resource.current_organization
        const scope = params.scope ?? 'user'
        const count = params.count ?? 20
        const user = scope === 'user' ? currentUser.resource.uri : undefined
        return calendly.listWebhookSubscriptions({
          organization,
          scope,
          count,
          user,
        })
      }
      default: {
        const _exhaustiveCheck: never = this.schema.action
        throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
      }
    }
  }
}

import type { Token } from '../../../../features/connection/domain/value-object/token.value-object'
import type { AirtableActionSchema } from './airtable-action.schema'
import { AirtableIntegration } from './airtable.integration'

export class AirtableActionIntegration {
  constructor(private readonly schema: AirtableActionSchema) {}

  async runAction(token: Token): Promise<Record<string, unknown>> {
    const airtable = new AirtableIntegration(token.access_token)
    switch (this.schema.action) {
      case 'list-webhook-payloads': {
        const { baseId, webhookId, cursor, limit } = this.schema.params
        return airtable.listWebhookPayloads({
          baseId,
          webhookId,
          cursor,
          limit,
        })
      }
      default: {
        const _exhaustiveCheck: never = this.schema.action
        throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
      }
    }
  }
}

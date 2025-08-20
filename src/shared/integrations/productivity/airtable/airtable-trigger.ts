import type { Token } from '../../../../features/connection/domain/value-object/token.value-object'
import { AirtableIntegration } from './airtable.integration'
import type { AirtableTriggerSchema } from './airtable-trigger.schema'

export class AirtableTriggerIntegration {
  constructor(
    private readonly schema: AirtableTriggerSchema,
    private readonly automationId: number
  ) {}

  async setupTrigger(token: Token, url: string) {
    const airtable = new AirtableIntegration(token.access_token)
    switch (this.schema.event) {
      case 'record-created': {
        const { baseId, tableId } = this.schema.params
        const { webhooks } = await airtable.listWebhooks({
          baseId,
        })
        const webhook = webhooks.find((webhook) =>
          webhook.notificationUrl?.endsWith(this.automationId.toString())
        )
        if (!webhook) {
          await airtable.createWebhook({
            baseId,
            notificationUrl: url,
            specification: {
              options: {
                filters: {
                  dataTypes: ['tableData'],
                  changeTypes: ['add'],
                  recordChangeScope: tableId,
                },
              },
            },
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

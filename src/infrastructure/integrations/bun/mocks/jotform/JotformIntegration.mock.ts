import type { IJotformIntegration } from '/adapter/spi/integrations/JotformSpi'
import type { JotformConfig } from '/domain/integrations/Jotform/JotformConfig'
import { BaseMockIntegration } from '../base'
import type {
  DeleteWebhookParams,
  JotformWebhookParams,
  JotformWebhookResponse,
} from '/domain/integrations/Jotform/JotformTypes'
import type { IntegrationResponse } from '/domain/integrations/base'
import type { SQLiteDatabaseTableDriver } from '/infrastructure/drivers/bun/DatabaseDriver/SQLite/SQLiteTableDriver'
import type { RecordFields } from '/domain/entities/Record/RecordTypes'

export type FormWebhookRecordFields = RecordFields & {
  content: string
}

export class JotformIntegration extends BaseMockIntegration implements IJotformIntegration {
  private _webhooks: SQLiteDatabaseTableDriver

  constructor(public config: JotformConfig) {
    super(config, config.apiKey)

    this._webhooks = this._db.table({
      name: 'FormWebhook',
      fields: [{ name: 'content', type: 'LongText' }],
    })
    this._webhooks.ensureSync()
  }

  deleteWebhook = async (
    params: DeleteWebhookParams
  ): Promise<IntegrationResponse<JotformWebhookResponse>> => {
    const result = await this._webhooks.readById<FormWebhookRecordFields>(params.formId)

    const webhook = JSON.parse(result?.fields.content ?? '{}')

    delete webhook[params.webhookId]

    this._webhooks.updateSync<FormWebhookRecordFields>({
      id: params.formId,
      updated_at: new Date().toISOString(),
      fields: {
        content: JSON.stringify(webhook),
      },
    })

    return {
      data: {
        responseCode: 200,
        message: 'success',
        content: webhook,
        'limit-left': 100,
      },
    }
  }

  listWebhooks = async (formId: string): Promise<IntegrationResponse<JotformWebhookResponse>> => {
    const result = await this._webhooks.readById<FormWebhookRecordFields>(formId)
    return {
      data: {
        responseCode: 200,
        message: 'success',
        content: JSON.parse(result?.fields.content ?? '{}'),
        'limit-left': 100,
      },
    }
  }

  addWebhook = async (
    params: JotformWebhookParams
  ): Promise<IntegrationResponse<JotformWebhookResponse>> => {
    await this._webhooks.insert<FormWebhookRecordFields>({
      id: params.formId,
      created_at: new Date().toISOString(),
      fields: {
        content: JSON.stringify({ '0': params.webhookUrl }),
      },
    })
    return {
      data: {
        responseCode: 200,
        message: 'success',
        content: { '0': params.webhookUrl },
        'limit-left': 100,
      },
    }
  }
}

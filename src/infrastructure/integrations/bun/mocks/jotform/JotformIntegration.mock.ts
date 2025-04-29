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
    const existingWebhook = await this._webhooks.readById<FormWebhookRecordFields>(params.formId)
    let webhookContent: Record<string, string> = { '0': params.webhookUrl }
    if (existingWebhook) {
      // merge the existing webhook with the new webhook
      webhookContent = JSON.parse(existingWebhook.fields.content ?? '{}') ?? {}
      const newWebhookId: number =
        (Object.keys(webhookContent)
          ?.map((k) => Number(k))
          .sort()
          .pop() ?? -1) + 1
      webhookContent[newWebhookId.toString()] = params.webhookUrl

      await this._webhooks.updateSync<FormWebhookRecordFields>({
        id: params.formId,
        updated_at: new Date().toISOString(),
        fields: {
          content: JSON.stringify(webhookContent),
        },
      })
    } else {
      await this._webhooks.insertSync<FormWebhookRecordFields>({
        id: params.formId,
        created_at: new Date().toISOString(),
        fields: {
          content: JSON.stringify(webhookContent),
        },
      })
    }
    return {
      data: {
        responseCode: 200,
        message: 'success',
        content: webhookContent,
        'limit-left': 100,
      },
    }
  }
}

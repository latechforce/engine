import { BaseAntiCorruptionLayer } from './base-anti-corruption-layer'
import { ExternalWebhook } from '../entity/external-webhook.entity'
import { Id } from '../value-object/id.value-object'
import { Url } from '../value-object/url.value-object'
// eslint-disable-next-line boundaries/element-types
import type { LoggerService } from '../../infrastructure/service/logger.service'
import type {
  ListWebhooksResponse,
  ListWebhookPayloadsResponse,
  CreateWebhookResponse,
} from '../../integrations/productivity/airtable/airtable.types'

/**
 * Anti-corruption layer for Airtable API
 * Protects domain from Airtable-specific data structures and API changes
 */
export class AirtableAntiCorruptionLayer extends BaseAntiCorruptionLayer<
  ListWebhooksResponse['webhooks'][0],
  ExternalWebhook
> {
  constructor(logger: LoggerService) {
    super(logger)
  }

  toDomain(airtableWebhook: ListWebhooksResponse['webhooks'][0]): ExternalWebhook {
    const notificationUrl = airtableWebhook.notificationUrl
      ? new Url(airtableWebhook.notificationUrl)
      : null

    return new ExternalWebhook(
      new Id(parseInt(airtableWebhook.id) || 1), // Fallback to 1 if not numeric
      notificationUrl,
      airtableWebhook.isHookEnabled,
      {
        dataTypes: airtableWebhook.specification.options.filters.dataTypes,
        changeTypes: [], // Airtable uses recordChangeScope instead of specific change types
        sources: [airtableWebhook.specification.options.filters.recordChangeScope || 'all'],
      },
      {
        expirationTime: airtableWebhook.expirationTime
          ? new Date(airtableWebhook.expirationTime)
          : null,
        lastNotificationTime: airtableWebhook.lastSuccessfulNotificationTime
          ? new Date(airtableWebhook.lastSuccessfulNotificationTime)
          : null,
        isNotificationsEnabled: airtableWebhook.areNotificationsEnabled,
        source: 'airtable',
        version: '1.0',
      }
    )
  }

  toExternal(webhook: ExternalWebhook): ListWebhooksResponse['webhooks'][0] {
    return {
      areNotificationsEnabled: webhook.metadata.isNotificationsEnabled,
      cursorForNextPayload: 0, // Default value
      expirationTime: webhook.metadata.expirationTime?.toISOString() || '',
      id: webhook.id.toString(),
      isHookEnabled: webhook.isEnabled,
      lastNotificationResult: null,
      lastSuccessfulNotificationTime: webhook.metadata.lastNotificationTime?.toISOString() || null,
      notificationUrl: webhook.notificationUrl?.toString() || null,
      specification: {
        options: {
          filters: {
            dataTypes: webhook.filters.dataTypes,
            recordChangeScope: webhook.filters.sources[0] || 'all',
          },
        },
      },
    }
  }

  validateExternal(data: unknown): data is ListWebhooksResponse['webhooks'][0] {
    if (!data || typeof data !== 'object') return false

    const webhook = data as {
      id?: unknown
      isHookEnabled?: unknown
      areNotificationsEnabled?: unknown
      specification?: {
        options?: {
          filters?: {
            dataTypes?: unknown
          }
        }
      }
    }
    return (
      typeof webhook.id === 'string' &&
      typeof webhook.isHookEnabled === 'boolean' &&
      typeof webhook.areNotificationsEnabled === 'boolean' &&
      webhook.specification !== undefined &&
      typeof webhook.specification === 'object' &&
      webhook.specification.options !== undefined &&
      typeof webhook.specification.options === 'object' &&
      webhook.specification.options.filters !== undefined &&
      typeof webhook.specification.options.filters === 'object' &&
      Array.isArray(webhook.specification.options.filters.dataTypes)
    )
  }

  getServiceInfo(): { name: string; version: string } {
    return { name: 'Airtable', version: 'v1.0' }
  }

  /**
   * Transform Airtable webhook payloads to domain format
   */
  transformWebhookPayloads(payloads: ListWebhookPayloadsResponse): {
    cursor: number
    hasMore: boolean
    events: Array<{
      timestamp: Date
      source: string
      user: {
        id: string
        email: string
        permissionLevel: string
      }
      transactionNumber: number
    }>
  } {
    return {
      cursor: payloads.cursor,
      hasMore: payloads.mightHaveMore,
      events: payloads.payloads.map((payload) => ({
        timestamp: new Date(payload.timestamp),
        source: payload.actionMetadata.source,
        user: {
          id: payload.actionMetadata.sourceMetadata.user.id,
          email: payload.actionMetadata.sourceMetadata.user.email,
          permissionLevel: payload.actionMetadata.sourceMetadata.user.permissionLevel,
        },
        transactionNumber: payload.baseTransactionNumber,
      })),
    }
  }

  /**
   * Transform domain webhook creation request to Airtable format
   */
  transformCreateWebhookRequest(domainRequest: {
    notificationUrl: string
    dataTypes: string[]
    changeTypes?: string[]
    sources?: string[]
  }): {
    notificationUrl: string
    specification: {
      options: {
        filters: {
          dataTypes: string[]
          recordChangeScope?: string
        }
      }
    }
  } {
    return {
      notificationUrl: domainRequest.notificationUrl,
      specification: {
        options: {
          filters: {
            dataTypes: domainRequest.dataTypes,
            recordChangeScope: domainRequest.sources?.[0] || 'all',
          },
        },
      },
    }
  }

  /**
   * Transform Airtable webhook creation response to domain format
   */
  transformCreateWebhookResponse(response: CreateWebhookResponse): {
    id: string
    expirationTime: Date
    macSecret: string
  } {
    return {
      id: response.id,
      expirationTime: new Date(response.expirationTime),
      macSecret: response.macSecretBase64,
    }
  }
}

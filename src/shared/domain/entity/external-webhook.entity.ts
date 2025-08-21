import { Id } from '../value-object/id.value-object'
import { Url } from '../value-object/url.value-object'

/**
 * Domain representation of external service webhooks
 * Protects domain from external API changes
 */
export class ExternalWebhook {
  constructor(
    public readonly id: Id,
    public readonly notificationUrl: Url | null,
    public readonly isEnabled: boolean,
    public readonly filters: {
      dataTypes: string[]
      changeTypes: string[]
      sources: string[]
    },
    public readonly metadata: {
      expirationTime: Date | null
      lastNotificationTime: Date | null
      isNotificationsEnabled: boolean
      source: string
      version: string
    }
  ) {}

  isExpired(): boolean {
    if (!this.metadata.expirationTime) return false
    return this.metadata.expirationTime < new Date()
  }

  supportsDataType(dataType: string): boolean {
    return this.filters.dataTypes.includes(dataType)
  }

  supportsChangeType(changeType: string): boolean {
    return this.filters.changeTypes.includes(changeType)
  }

  supportsSource(source: string): boolean {
    return this.filters.sources.includes(source)
  }
}

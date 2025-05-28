import type { Connection } from '../connection.entity'
import type { IntegrationTriggerSchema } from '@/domain/validator/trigger/integration'

export class IntegrationTrigger {
  constructor(
    public readonly schema: IntegrationTriggerSchema,
    public readonly automationName: string,
    public readonly connection: Connection
  ) {}

  get url(): string {
    let baseUrl = this.connection.appBaseUrl.replace(/\/$/, '')
    const path = this.schema.path.replace(/^\//, '')
    if (baseUrl.includes('localhost')) {
      baseUrl = baseUrl.replace(this.connection.appBaseUrl, 'https://example.com')
    }
    return `${baseUrl}/api/automation/${path}`
  }

  get path() {
    return this.schema.path.replace(/^\//, '')
  }
}

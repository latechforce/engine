import type { Connection } from '../../../../features/connection/domain/entity/connection.entity'
import type { IntegrationTriggerSchema } from '../schema/integration'

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
    return `${baseUrl}/api/automations/${path}`
  }

  get path() {
    return this.schema.path.replace(/^\//, '')
  }
}

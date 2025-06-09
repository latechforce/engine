import type { Automation } from '../../../automation/domain/entity/automation.entity'
import type { Connection } from '../../../../features/connection/domain/entity/connection.entity'
import type { IntegrationTriggerSchema } from '../schema/integration'

export class IntegrationTrigger {
  constructor(
    public readonly schema: IntegrationTriggerSchema,
    public readonly automation: Automation,
    public readonly connection: Connection
  ) {}

  get url(): string {
    let baseUrl = this.connection.appBaseUrl.replace(/\/$/, '')
    if (baseUrl.includes('localhost')) {
      baseUrl = baseUrl.replace(this.connection.appBaseUrl, 'https://example.com')
    }
    return `${baseUrl}/api/automations/${this.automation.schema.id}`
  }
}

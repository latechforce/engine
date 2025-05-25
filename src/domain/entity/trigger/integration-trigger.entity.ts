import type { Connection } from '../connection.entity'
import type { IntegrationTriggerSchema } from '@/domain/validator/trigger/integration'

export class IntegrationTrigger {
  constructor(
    public readonly schema: IntegrationTriggerSchema,
    public readonly connection: Connection
  ) {}

  get url(): string {
    return (
      this.connection.appBaseUrl.replace(/\/$/, '') +
      '/api/automation/' +
      this.schema.path.replace(/^\//, '')
    )
  }
}

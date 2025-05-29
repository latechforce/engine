import type { AutomationSchema } from '@/automation/domain/schema/automation.schema'
import type { Connection } from '@/connection/domain/entity/connection.entity'
import type { IntegrationActionSchema } from '@/action/domain/schema/integration'

export class IntegrationAction {
  constructor(
    public readonly schema: IntegrationActionSchema,
    public readonly automation: AutomationSchema,
    public readonly connection: Connection
  ) {}
}

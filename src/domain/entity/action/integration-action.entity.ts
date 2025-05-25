import type { AutomationSchema } from '@/types'
import type { Connection } from '../connection.entity'
import type { IntegrationActionSchema } from '@/domain/validator/action/integration'

export class IntegrationAction {
  constructor(
    public readonly schema: IntegrationActionSchema,
    public readonly automation: AutomationSchema,
    public readonly connection: Connection
  ) {}
}

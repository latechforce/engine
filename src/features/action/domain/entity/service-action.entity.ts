import type { ServiceActionSchema } from '@/action/domain/schema/service'
import type { AutomationSchema } from '@/automation/domain/schema/automation.schema'

export class ServiceAction {
  constructor(
    public readonly schema: ServiceActionSchema,
    public readonly automation: AutomationSchema
  ) {}
}

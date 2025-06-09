import type { Automation } from '../../../automation/domain/entity/automation.entity'
import type { ServiceTriggerSchema } from '../schema/service'

export class ServiceTrigger {
  constructor(
    public readonly schema: ServiceTriggerSchema,
    public readonly automation: Automation
  ) {}
}

import type { ServiceActionSchema } from '@/domain/schema/action/service'
import type { AutomationSchema } from '@/types'

export class ServiceAction {
  constructor(
    public readonly schema: ServiceActionSchema,
    public readonly automation: AutomationSchema
  ) {}
}

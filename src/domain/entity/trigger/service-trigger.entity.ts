import type { ServiceTriggerSchema } from '@/domain/validator/trigger/service'

export class ServiceTrigger {
  constructor(
    public readonly schema: ServiceTriggerSchema,
    public readonly automationName: string
  ) {}

  get path() {
    return this.schema.path.replace(/^\//, '')
  }
}

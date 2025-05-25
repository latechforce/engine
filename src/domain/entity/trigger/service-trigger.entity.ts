import type { ServiceTriggerSchema } from '@/domain/validator/trigger/service'

export class ServiceTrigger {
  constructor(public readonly schema: ServiceTriggerSchema) {}
}

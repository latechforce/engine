import type { ServiceTriggerSchema } from '../schema/service'

export class ServiceTrigger {
  constructor(
    public readonly schema: ServiceTriggerSchema,
    public readonly automationName: string
  ) {}

  get path(): string | undefined {
    if ('path' in this.schema) {
      return this.schema.path.replace(/^\//, '')
    }
    return undefined
  }
}

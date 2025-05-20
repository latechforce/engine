import type { ActionSchema, AutomationSchema } from '@/types'

export class Action<T extends ActionSchema = ActionSchema> {
  constructor(
    public readonly schema: T,
    public readonly automation: AutomationSchema
  ) {}

  get name() {
    return this.schema.name
  }
}

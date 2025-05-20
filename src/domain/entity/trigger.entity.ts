import type { TriggerSchema } from '@/types'

export class Trigger {
  constructor(public readonly schema: TriggerSchema) {}
}

import type { TriggerSchema } from '../../../trigger/domain/schema/trigger.schema'

export type TriggerStep = {
  type: 'trigger'
  schema: TriggerSchema
  output: Record<string, unknown>
}

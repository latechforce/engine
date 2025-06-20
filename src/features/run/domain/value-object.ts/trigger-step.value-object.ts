import type { TriggerSchema } from '../../../trigger/domain/schema/trigger.schema'

export type TriggerStep = {
  schema: TriggerSchema
  output: Record<string, unknown>
}

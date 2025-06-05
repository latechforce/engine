import type { AutomationSchema } from '../schema/automation.schema'

export type AutomationStatus = {
  id: number
  active: boolean
  schema: AutomationSchema
  createdAt: Date
  updatedAt: Date
}

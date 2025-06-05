import type { Automation } from '../../domain/entity/automation.entity'
import type { AutomationStatus } from '../../domain/value-object/automation-status.value-object'

export type AutomationDto = {
  id: number
  name: string
  active: boolean
  updatedAt: string
}

export function toAutomationDto(automation: Automation, status: AutomationStatus): AutomationDto {
  return {
    id: automation.schema.id,
    name: automation.schema.name,
    active: status.active,
    updatedAt: status.updatedAt.toISOString(),
  }
}

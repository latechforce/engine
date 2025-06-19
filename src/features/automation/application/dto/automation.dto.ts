import type { Automation } from '../../domain/entity/automation.entity'
import type { AutomationStatus } from '../../domain/value-object/automation-status.value-object'

export type AutomationDto = {
  id: number
  name: string
  description?: string
  active: boolean
  editUrl?: string
  updatedAt: string
}

export function toAutomationDto(automation: Automation, status: AutomationStatus): AutomationDto {
  return {
    id: automation.schema.id,
    name: automation.schema.name,
    description: automation.schema.description,
    active: status.active,
    editUrl: automation.schema.editUrl,
    updatedAt: status.updatedAt.toISOString(),
  }
}

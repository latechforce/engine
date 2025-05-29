import type { Automation } from '@/automation/domain/entity/automation.entity'

export type AutomationDto = {
  name: string
}

export function toAutomationDto(automation: Automation): AutomationDto {
  return {
    name: automation.schema.name,
  }
}

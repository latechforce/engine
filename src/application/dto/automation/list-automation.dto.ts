import type { Automation } from '@/domain/entity/automation.entity'
import { toAutomationDto, type AutomationDto } from './automation.dto'

export type ListAutomationsDto = {
  automations: AutomationDto[]
}

export function toListAutomationsDto(automations: Automation[]): ListAutomationsDto {
  return {
    automations: automations.map(toAutomationDto),
  }
}

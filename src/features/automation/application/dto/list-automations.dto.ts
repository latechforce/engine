import type { Automation } from '../../domain/entity/automation.entity'
import type { AutomationStatus } from '../../domain/value-object/automation-status.value-object'
import { toAutomationDto, type AutomationDto } from './automation.dto'

export type ListAutomationsDto = {
  automations: AutomationDto[]
}

export function toListAutomationsDto(
  automations: Automation[],
  statuses: AutomationStatus[]
): ListAutomationsDto {
  return {
    automations: automations.map((a) => {
      const status = statuses.find((s) => s.id === a.schema.id)
      if (!status) {
        throw new Error(`Automation status not found for automation ${a.schema.name}`)
      }
      return toAutomationDto(a, status)
    }),
  }
}

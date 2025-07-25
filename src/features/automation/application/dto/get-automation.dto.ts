import type { RunDto } from '../../../run/application/dto/run.dto'
import type { Automation } from '../../domain/entity/automation.entity'
import type { AutomationStatus } from '../../domain/value-object/automation-status.value-object'
import { toAutomationDto, type AutomationDto } from './automation.dto'
import type { Run } from '../../../run/domain/entity/run.entity'
import { toRunDto } from '../../../run/application/dto/run.dto'
import type { PaginationDto } from '../../../run/application/dto/list-runs.dto'

export type GetAutomationDto = {
  automation: AutomationDto
  runs: RunDto[]
  pagination: PaginationDto
}

export function toGetAutomationDto(
  automation: Automation,
  status: AutomationStatus,
  runs: Run[],
  pagination: PaginationDto
): GetAutomationDto {
  return {
    automation: toAutomationDto(automation, status),
    runs: runs.map((r) => toRunDto(r, automation)),
    pagination,
  }
}

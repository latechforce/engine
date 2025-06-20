import type { Automation } from '../../../../features/automation/domain/entity/automation.entity'
import type { Run } from '../../domain/entity/run.entity'
import { toRunDto, type RunDto } from './run.dto'

export type ListRunsDto = {
  runs: RunDto[]
}

export function toListRunsDto(runs: Run[], automations: Automation[]): ListRunsDto {
  return {
    runs: runs.map((run) => {
      const automation = automations.find(
        (automation) => automation.schema.id === run.automation_id
      )
      if (!automation) {
        throw new Error('Automation not found')
      }
      return toRunDto(run, automation)
    }),
  }
}

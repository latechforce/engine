import type { Run } from '../../domain/entity/run.entity'
import { toRunDto, type RunDto } from './run.dto'
import type { Automation } from '../../../../features/automation/domain/entity/automation.entity'
import type { Steps } from '../../domain/value-object.ts/step.value-object'
import type { AutomationDto } from '../../../automation/application/dto/automation.dto'
import { toAutomationDto } from '../../../automation/application/dto/automation.dto'
import type { AutomationStatus } from '../../../automation/domain/value-object/automation-status.value-object'

export type GetRunDto = {
  run: RunDto
  automation: AutomationDto
  steps: Steps
}

export function toGetRunDto(run: Run, automation: Automation, status: AutomationStatus): GetRunDto {
  return {
    run: toRunDto(run, automation),
    automation: toAutomationDto(automation, status),
    steps: run.steps,
  }
}

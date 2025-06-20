import type { Run } from '../../domain/entity/run.entity'
import { toRunDto, type RunDto } from './run.dto'
import type { Automation } from '../../../../features/automation/domain/entity/automation.entity'
import type { Steps } from '../../domain/value-object.ts/step.value-object'

export type GetRunDto = {
  run: RunDto
  steps: Steps
}

export function toGetRunDto(run: Run, automation: Automation): GetRunDto {
  return {
    run: toRunDto(run, automation),
    steps: run.steps,
  }
}

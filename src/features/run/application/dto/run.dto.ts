import type { Automation } from '../../../../features/automation/domain/entity/automation.entity'
import type { Run } from '../../domain/entity/run.entity'

export type RunDto = {
  id: string
  status: 'playing' | 'success' | 'stopped' | 'filtered'
  createdAt: string
  updatedAt: string
  automationId: string
  automationName: string
}

export function toRunDto(run: Run, automation: Automation): RunDto {
  return {
    id: run.id,
    status: run.status,
    createdAt: run.createdAt.toISOString(),
    updatedAt: run.updatedAt.toISOString(),
    automationId: automation.schema.id.toString(),
    automationName: automation.schema.name,
  }
}

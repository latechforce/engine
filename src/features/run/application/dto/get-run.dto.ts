import { type Run } from '@/run/domain/entity'
import { toRunDto, type RunDto } from './run.dto'
import type { AutomationSchema } from '@/automation/domain/schema/automation.schema'

export type GetRunDto = {
  run: RunDto
  automation_schema: AutomationSchema
  data: Record<string, object>
}

export function toGetRunDto(run: Run): GetRunDto {
  return {
    run: toRunDto(run),
    automation_schema: run.automation_schema,
    data: run.data,
  }
}

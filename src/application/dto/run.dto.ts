import type { RunSchema } from '@/infrastructure/validator/run.validator'
import { type Run, RunStopped } from '@/domain/entity/run'

export function toRunDto(run: Run): RunSchema {
  return {
    id: run.id,
    status: run.status,
    created_at: run.createdAt.toISOString(),
    updated_at: run.updatedAt.toISOString(),
    automation_schema: run.automation.schema,
    data: run.data,
    last_action_name: run.lastActionName,
    error_message: run instanceof RunStopped ? run.errorMessage : null,
  }
}

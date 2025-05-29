import { type Run } from '@/domain/entity/run'

export type RunDto = {
  id: string
  status: string
  created_at: string
  updated_at: string
  automation_name: string
}

export function toRunDto(run: Run): RunDto {
  return {
    id: run.id,
    status: run.status,
    created_at: run.createdAt.toISOString(),
    updated_at: run.updatedAt.toISOString(),
    automation_name: run.automation_schema.name,
  }
}

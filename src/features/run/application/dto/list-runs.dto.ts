import { type Run } from '@/run/domain/entity'
import { toRunDto, type RunDto } from './run.dto'

export type ListRunsDto = {
  runs: RunDto[]
}

export function toListRunsDto(runs: Run[]): ListRunsDto {
  return {
    runs: runs.map(toRunDto),
  }
}

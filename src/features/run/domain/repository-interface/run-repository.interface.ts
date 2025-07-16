import type { Run } from '../entity/run.entity'

export type ListRunsParams = {
  search: string
  pageIndex: number
  pageSize: number
}

export type IRunRepository = {
  create: (run: Run) => Promise<void>
  onCreate: (handler: (run: Run) => Promise<void>) => void
  update: (run: Run) => Promise<void>
  onUpdate: (handler: (run: Run) => Promise<void>) => void
  list: (
    params: ListRunsParams,
    automationsIdsFiltered?: number[]
  ) => Promise<{ runs: Run[]; totalCount: number }>
  listByAutomationId: (
    automationId: number,
    params: ListRunsParams
  ) => Promise<{ runs: Run[]; totalCount: number }>
  get: (id: string) => Promise<Run | undefined>
  delete: (id: string) => Promise<void>
}

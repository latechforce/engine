import type { Run, RunStatus } from '../entity/run.entity'

export type ListRunsParams = {
  search: string
  pageIndex: number
  pageSize: number
  status: string
}

export type IRunRepository = {
  debug: (message: string) => void
  create: (run: Run) => Promise<void>
  onCreate: (handler: (run: Run) => Promise<void>) => void
  update: (run: Run) => Promise<void>
  onUpdate: (handler: (run: Run) => Promise<void>) => void
  list: (
    params: ListRunsParams,
    automationsIds?: number[]
  ) => Promise<{ runs: Run[]; totalCount: number }>
  listAllByIdsAndStatus: (ids: string[], status: RunStatus) => Promise<Run[]>
  listByAutomationId: (
    automationId: number,
    params: ListRunsParams
  ) => Promise<{ runs: Run[]; totalCount: number }>
  get: (id: string) => Promise<Run | undefined>
  delete: (id: string) => Promise<void>
}

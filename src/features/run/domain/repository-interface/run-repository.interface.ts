import type { Run } from '../entity/run.entity'

export type IRunRepository = {
  create: (run: Run) => Promise<void>
  onCreate: (handler: (run: Run) => Promise<void>) => void
  update: (run: Run) => Promise<void>
  onUpdate: (handler: (run: Run) => Promise<void>) => void
  list: () => Promise<Run[]>
  listByAutomationId: (automationId: number) => Promise<Run[]>
  get: (id: string) => Promise<Run | undefined>
  delete: (id: string) => Promise<void>
}

import type { Run, RunPlaying } from '../entity/run'

export type IRunRepository = {
  create: (run: RunPlaying) => Promise<void>
  onCreate: (handler: (run: RunPlaying) => Promise<void>) => void
  update: (run: Run) => Promise<void>
  onUpdate: (handler: (run: Run) => Promise<void>) => void
  list: () => Promise<Run[]>
  listPlaying: () => Promise<RunPlaying[]>
  get: (id: string) => Promise<Run | undefined>
  delete: (id: string) => Promise<void>
}

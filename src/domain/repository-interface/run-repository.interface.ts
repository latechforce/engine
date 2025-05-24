import type { Run, PlayingRun } from '../entity/run'

export type IRunRepository = {
  create: (run: PlayingRun) => Promise<void>
  onCreate: (handler: (run: PlayingRun) => Promise<void>) => void
  update: (run: Run) => Promise<void>
  onUpdate: (handler: (run: Run) => Promise<void>) => void
  list: () => Promise<Run[]>
  listPlaying: () => Promise<PlayingRun[]>
  get: (id: string) => Promise<Run | undefined>
  delete: (id: string) => Promise<void>
}

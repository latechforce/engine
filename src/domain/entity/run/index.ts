import { RunPlaying } from './run-playing.entity'
import { RunSuccess } from './run-success.entity'
import { RunStopped } from './run-stopped.entity'

export type Run = RunPlaying | RunSuccess | RunStopped

export { RunPlaying, RunSuccess, RunStopped }

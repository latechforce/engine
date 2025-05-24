import { PlayingRun } from './playing-run.entity'
import { SuccessRun } from './success-run.entity'
import { StoppedRun } from './stopped-run.entity'

export type Run = PlayingRun | SuccessRun | StoppedRun

export { PlayingRun, SuccessRun, StoppedRun }

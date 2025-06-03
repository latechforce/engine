// Run domain imports
import { PlayingRun } from './playing-run.entity'
import { SuccessRun } from './success-run.entity'
import { StoppedRun } from './stopped-run.entity'
import { FilteredRun } from './filtered-run.entity'

export type Run = PlayingRun | SuccessRun | StoppedRun | FilteredRun

export { PlayingRun, SuccessRun, StoppedRun, FilteredRun }

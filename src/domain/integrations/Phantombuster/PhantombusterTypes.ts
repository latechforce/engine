export interface PhantombusterAgentOutput {
  containerId: string
  status: 'starting' | 'running' | 'finished' | 'unknown' | 'launch error'
  output?: string
  outputPos?: number
  mostRecentEnded?: number
  progress?: number
  progressLabel?: string
  isAgentRunning?: boolean
  canSoftAbort?: boolean
}

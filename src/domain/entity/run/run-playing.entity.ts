import crypto from 'crypto'
import { Automation } from '../automation.entity'
import type { AutomationSchema } from '@/types'
import { RunSuccess } from './run-success.entity'
import { RunStopped } from './run-stopped.entity'

export class RunPlaying {
  public readonly status = 'playing'
  public readonly automation: Automation

  constructor(
    automation: AutomationSchema,
    public data: Record<string, object> = {},
    public readonly id: string = crypto.randomUUID(),
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public lastActionName: string | null = null
  ) {
    this.automation = new Automation(automation)
  }

  actionSuccess(actionName: string, result: object) {
    this.data[actionName] = result
    this.updatedAt = new Date()
    this.lastActionName = actionName
  }

  success() {
    return new RunSuccess(
      this.automation.schema,
      this.id,
      this.createdAt,
      this.updatedAt,
      this.data,
      this.lastActionName
    )
  }

  stop(actionName: string, error: Error) {
    return new RunStopped(
      this.automation.schema,
      this.id,
      this.createdAt,
      this.updatedAt,
      this.data,
      actionName,
      error.message
    )
  }
}

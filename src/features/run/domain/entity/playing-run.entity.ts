import crypto from 'crypto'
import type { AutomationSchema } from '@/automation/domain/schema/automation.schema'
import { SuccessRun } from './success-run.entity'
import { StoppedRun } from './stopped-run.entity'
import type { IntegrationError } from '@/action/domain/value-object/integration-error.value.object'
import type { ServiceError } from '@/action/domain/value-object/service-error.value-object'

export class PlayingRun {
  public readonly status = 'playing'

  constructor(
    public readonly automation_schema: AutomationSchema,
    public data: Record<string, object> = {},
    public readonly id: string = crypto.randomUUID(),
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public lastActionName: string | null = null
  ) {}

  actionSuccess(actionName: string, result: object) {
    this.data[actionName] = result
    this.updatedAt = new Date()
    this.lastActionName = actionName
  }

  success() {
    return new SuccessRun(
      this.automation_schema,
      this.id,
      this.createdAt,
      this.updatedAt,
      this.data,
      this.lastActionName
    )
  }

  stop(actionName: string, error: IntegrationError | ServiceError) {
    this.data[actionName] = error
    this.updatedAt = new Date()
    this.lastActionName = actionName
    return new StoppedRun(
      this.automation_schema,
      this.id,
      this.createdAt,
      this.updatedAt,
      this.data,
      actionName,
      error.message
    )
  }
}

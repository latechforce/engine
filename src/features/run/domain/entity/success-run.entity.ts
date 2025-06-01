import type { AutomationSchema } from '@/automation/domain/schema/automation.schema'

export class SuccessRun {
  public readonly status = 'success'

  constructor(
    public readonly automation_schema: AutomationSchema,
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly data: Record<string, object>,
    public readonly lastActionName: string | null
  ) {}

  getLastActionData() {
    if (!this.lastActionName) {
      throw new Error('No last action name')
    }
    if (!this.data[this.lastActionName]) {
      throw new Error('No last action data')
    }
    return this.data[this.lastActionName]
  }

  getLastAction() {
    const action = this.automation_schema.actions.find(
      (action) => action.name === this.lastActionName
    )
    if (!action) {
      throw new Error('Action not found')
    }
    return action
  }
}

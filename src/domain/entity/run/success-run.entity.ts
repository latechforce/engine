import { Automation } from '../automation.entity'
import type { AutomationSchema } from '@/types'

export class SuccessRun {
  public readonly status = 'success'
  public readonly automation: Automation

  constructor(
    automation: AutomationSchema,
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly data: Record<string, object>,
    public readonly lastActionName: string | null
  ) {
    this.automation = new Automation(automation)
  }

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
    const action = this.automation.actions.find((action) => action.name === this.lastActionName)
    if (!action) {
      throw new Error('Action not found')
    }
    return action
  }
}

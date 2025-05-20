import { Automation } from '../automation.entity'
import type { AutomationSchema } from '@/types'

export class RunStopped {
  public readonly status = 'stopped'
  public readonly automation: Automation

  constructor(
    automation: AutomationSchema,
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly data: Record<string, object>,
    public readonly lastActionName: string | null,
    public readonly errorMessage: string
  ) {
    this.automation = new Automation(automation)
  }
}

import type { AutomationSchema } from '@/domain/schema/automation.schema'

export class StoppedRun {
  public readonly status = 'stopped'

  constructor(
    public readonly automation_schema: AutomationSchema,
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly data: Record<string, object>,
    public readonly lastActionName: string | null,
    public readonly errorMessage: string
  ) {}
}

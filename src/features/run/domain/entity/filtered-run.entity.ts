import type { AutomationSchema } from '@/automation/domain/schema/automation.schema'

export class FilteredRun {
  public readonly status = 'filtered'

  constructor(
    public readonly automation_schema: AutomationSchema,
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly data: Record<string, object>,
    public readonly lastActionName: string | null
  ) {}
}

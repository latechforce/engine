import type { RouteConfig } from '@hono/zod-openapi'
import type { AutomationStatus } from '../value-object/automation-status.value-object'
import type { AutomationSchema } from '../schema/automation.schema'
import type { Run } from '../../../run/domain/entity/run.entity'
import type { Automation } from '../entity/automation.entity'

export type IAutomationRepository = {
  info(message: string): void
  error(message: string): void
  debug(message: string): void
  addOpenAPIRoute(routeConfig: RouteConfig): void
  status: {
    create: (status: AutomationStatus) => Promise<void>
    updateSchema: (id: number, schema: AutomationSchema) => Promise<void>
    setActive: (id: number, connected: boolean) => Promise<void>
    get: (id: number) => Promise<AutomationStatus | undefined>
    listByIds: (ids: number[]) => Promise<AutomationStatus[]>
  }
  sendAlertEmail(run: Run, automation: Automation, message: string): Promise<void>
}

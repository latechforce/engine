import { Hono } from 'hono'
import { AutomationController } from '@/automation/interface/controller/automation.controller'
import type { HonoType } from '@/shared/infrastructure/service/server.service'

export const automationRoutes = new Hono<HonoType>()
  .get('/', AutomationController.list)
  .get('/:path', AutomationController.trigger)
  .post('/:path', AutomationController.trigger)

export type AutomationType = typeof automationRoutes

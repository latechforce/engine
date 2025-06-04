// Third-party imports
import { Hono } from 'hono'

// Shared imports
import type { HonoType } from '../../../shared/infrastructure/service'

// Automation interface imports
import { AutomationController } from './controller/automation.controller'

export const automationRoutes = new Hono<HonoType>()
  .get('/', AutomationController.list)
  .get('/:path', AutomationController.trigger)
  .post('/:path', AutomationController.trigger)

export type AutomationType = typeof automationRoutes

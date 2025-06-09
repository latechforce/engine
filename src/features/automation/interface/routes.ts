import { Hono } from 'hono'
import type { HonoType } from '../../../shared/infrastructure/service'
import { AutomationController } from './controller/automation.controller'
import {
  automationFormValidator,
  automationPostJsonValidator,
  setStatusValidator,
} from './middleware/automation.middleware'

export const automationRoutes = new Hono<HonoType>()
  .get('/', AutomationController.list)
  .get('/:automationIdOrPath', (c) =>
    AutomationController.trigger(c, {
      automationIdOrPath: c.req.param('automationIdOrPath'),
      body: {},
    })
  )
  .post('/:automationIdOrPath', automationPostJsonValidator, (c) =>
    AutomationController.trigger(c, {
      automationIdOrPath: c.req.param('automationIdOrPath'),
      body: c.req.valid('json'),
    })
  )
  .post('/:automationIdOrPath/form', automationFormValidator, (c) =>
    AutomationController.trigger(c, {
      automationIdOrPath: c.req.param('automationIdOrPath'),
      body: c.req.valid('form'),
    })
  )
  .patch('/:automationId/status', setStatusValidator, (c) =>
    AutomationController.setStatus(c, {
      automationId: c.req.param('automationId'),
      active: c.req.valid('json').active,
    })
  )

export type AutomationType = typeof automationRoutes

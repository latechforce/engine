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
  .get('/:path', (c) => AutomationController.trigger(c, { path: c.req.param('path'), body: {} }))
  .post('/:path', automationPostJsonValidator, (c) =>
    AutomationController.trigger(c, {
      path: c.req.param('path'),
      body: c.req.valid('json'),
    })
  )
  .post('/:path/form', automationFormValidator, (c) =>
    AutomationController.trigger(c, {
      path: c.req.param('path'),
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

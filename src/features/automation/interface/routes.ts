import { Hono } from 'hono'
import type { HonoType } from '../../../shared/infrastructure/service'
import { AutomationController } from './controller/automation.controller'
import {
  automationPostFormValidator,
  automationPostJsonValidator,
  setStatusValidator,
} from './middleware/automation.middleware'
import { authRequiredMiddleware } from '../../user/interface/middleware/auth.middleware'

export const automationRoutes = new Hono<HonoType>()
  .get('/', authRequiredMiddleware, AutomationController.list)
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
  .post('/:automationIdOrPath/form/:formId', automationPostFormValidator, (c) =>
    AutomationController.trigger(c, {
      automationIdOrPath: c.req.param('automationIdOrPath'),
      body: c.req.valid('form'),
      formId: c.req.param('formId'),
    })
  )
  .patch('/:automationId/status', authRequiredMiddleware, setStatusValidator, (c) =>
    AutomationController.setStatus(c, {
      automationId: c.req.param('automationId'),
      active: c.req.valid('json').active,
    })
  )
  .get('/:automationId/runs', authRequiredMiddleware, (c) =>
    AutomationController.get(c, {
      automationId: c.req.param('automationId'),
    })
  )

export type AutomationType = typeof automationRoutes

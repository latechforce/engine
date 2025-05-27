import { Hono } from 'hono'
import { RunController } from './controller/run.controller'
import { AutomationController } from './controller/automation.controller'
import { authMiddleware } from './middleware/auth.middleware'
import { loggerMiddleware } from './middleware/logger.middleware'
import { corsMiddleware } from './middleware/cors.middleware'
import { ConnectionController } from './controller/connection.controller'
import type { HonoType } from '@/infrastructure/service/server.service'
import { FormController } from './controller/form.controller'

const server = new Hono<HonoType>()

export const api = server
  .use(loggerMiddleware)
  .use(authMiddleware)
  .use(corsMiddleware)
  .get('/health', (c) => c.text('OK'))
  .get('/runs', RunController.list)
  .get('/automations', AutomationController.list)
  .get('/connections', ConnectionController.list)
  .get('/forms', FormController.list)
  .get('/connection/auth', ConnectionController.authenticate)
  .post('/automation/:path', AutomationController.trigger)
  .get('/automation/:path', AutomationController.trigger)

export type AppType = typeof api

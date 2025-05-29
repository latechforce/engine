import { Hono } from 'hono'
import { RunController } from './controller/run.controller'
import { AutomationController } from './controller/automation.controller'
import { authMiddleware } from './middleware/auth.middleware'
import { loggerMiddleware } from './middleware/logger.middleware'
import { corsMiddleware } from './middleware/cors.middleware'
import { ConnectionController } from './controller/connection.controller'
import type { HonoType } from '@/infrastructure/di/server.di'
import { FormController } from './controller/form.controller'
import { AppController } from './controller/app.controller'

const server = new Hono<HonoType>()

export const api = server
  .use(loggerMiddleware)
  .use(authMiddleware)
  .use(corsMiddleware)
  .get('/health', (c) => c.text('OK'))
  .get('/metadata', AppController.metadata)
  .get('/runs', RunController.list)
  .get('/runs/:id', RunController.get)
  .get('/automations', AutomationController.list)
  .post('/automation/:path', AutomationController.trigger)
  .get('/automation/:path', AutomationController.trigger)
  .get('/connections', ConnectionController.list)
  .get('/connection/auth', ConnectionController.authenticate)
  .get('/forms', FormController.list)
  .get('/form/:path', FormController.get)

export type AppType = typeof api

import { Hono } from 'hono'
import { RunController } from './controller/run.controller'
import { AutomationController } from './controller/automation.controller'
import { authMiddleware } from './middleware/auth.middleware'
import { loggerMiddleware } from './middleware/logger.middleware'
import { corsMiddleware } from './middleware/cors.middleware'
import type { HonoType } from '@/infrastructure/service/server.service'

const server = new Hono<HonoType>()

export const api = server
  .use(loggerMiddleware)
  .use(authMiddleware)
  .use(corsMiddleware)
  .get('/health', (c) => c.text('OK'))
  .get('/runs', RunController.list)
  .get('/automations', AutomationController.list)
  .post('/automation/:path', AutomationController.triggerHttp)
  .get('/automation/:path', AutomationController.triggerHttp)

export type AppType = typeof api

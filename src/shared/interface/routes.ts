import { Hono } from 'hono'
import { authMiddleware } from '@/user/interface/middleware/auth.middleware'
import { loggerMiddleware } from './middleware/logger.middleware'
import { corsMiddleware } from './middleware/cors.middleware'
import type { HonoType } from '@/shared/infrastructure/service'
import { appRoutes } from '@/app/interface/routes'
import { runRoutes } from '@/run/interface/routes'
import { automationRoutes } from '@/automation/interface/routes'
import { connectionRoutes } from '@/connection/interface/routes'
import { formRoutes } from '@/form/interface/routes'

export const apiRoutes = new Hono<HonoType>()
  .use(loggerMiddleware)
  .use(corsMiddleware)
  .use(authMiddleware)
  .route('/', appRoutes)
  .route('/runs', runRoutes)
  .route('/automations', automationRoutes)
  .route('/connections', connectionRoutes)
  .route('/forms', formRoutes)

export type ApiType = typeof apiRoutes

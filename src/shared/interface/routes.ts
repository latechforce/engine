// Third-party imports
import { Hono } from 'hono'

// Shared interface imports
import { loggerMiddleware } from './middleware/logger.middleware'
import { corsMiddleware } from './middleware/cors.middleware'
import type { HonoType } from '../infrastructure/service'

// Feature interface imports
import {
  authMiddleware,
  authRequiredMiddleware,
} from '../../features/user/interface/middleware/auth.middleware'
import { appRoutes } from '../../features/app/interface/routes'
import { runRoutes } from '../../features/run/interface/routes'
import { automationRoutes } from '../../features/automation/interface/routes'
import { connectionRoutes } from '../../features/connection/interface/routes'
import { formRoutes } from '../../features/form/interface/routes'
import { tableRoutes } from '../../features/table/interface/routes'
import { bucketRoutes } from '../../features/bucket/interface/routes'

export const apiRoutes = new Hono<HonoType>()
  .use(loggerMiddleware)
  .use(authMiddleware)
  .use('*', corsMiddleware)
  .route('/', appRoutes)
  .route('/automations', automationRoutes)
  .route('/tables', tableRoutes)
  .route('/forms', formRoutes)
  .route('/connections', connectionRoutes)
  .use(authRequiredMiddleware)
  .route('/runs', runRoutes)
  .route('/buckets', bucketRoutes)

export type ApiType = typeof apiRoutes

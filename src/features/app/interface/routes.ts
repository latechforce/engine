// Third-party imports
import { Hono } from 'hono'

// App interface imports
import { AppController } from './controller/app.controller'
import type { AppHonoContextType } from '../infrastructure/di/context'
import { authRequiredMiddleware } from '../../user/interface/middleware/auth.middleware'

export type HonoType = { Variables: AppHonoContextType }

export const appRoutes = new Hono<HonoType>()
  .get('/health', (c) => c.text('OK'))
  .get('/metadata/app', AppController.appMetadata)
  .get('/metadata/admin', authRequiredMiddleware, AppController.adminMetadata)

export type AppRoutesType = typeof appRoutes

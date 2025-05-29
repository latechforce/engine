import { Hono } from 'hono'
import { AppController } from './controller/app.controller'
import type { AppHonoContextType } from '../infrastructure/di/context'

export type HonoType = { Variables: AppHonoContextType }

export const appRoutes = new Hono<HonoType>()
  .get('/health', (c) => c.text('OK'))
  .get('/metadata', AppController.metadata)

export type AppRoutesType = typeof appRoutes

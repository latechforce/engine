import { Hono } from 'hono'
import { ConnectionController } from './controller/connection.controller'
import type { HonoType } from '@/shared/infrastructure/service'

export const connectionRoutes = new Hono<HonoType>()
  .get('/', ConnectionController.list)
  .get('/auth', ConnectionController.authenticate)

export type ConnectionType = typeof connectionRoutes

// Third-party imports
import { Hono } from 'hono'

// Shared imports
import type { HonoType } from '../../../shared/infrastructure/service'

// Connection interface imports
import { ConnectionController } from './controller/connection.controller'

export const connectionRoutes = new Hono<HonoType>()
  .get('/', ConnectionController.list)
  .get('/auth', (c) =>
    ConnectionController.authenticate(c, {
      id: c.req.query('id'),
      code: c.req.query('code'),
    })
  )

export type ConnectionType = typeof connectionRoutes

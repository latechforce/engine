import { Hono } from 'hono'
import type { HonoType } from '../../../shared/infrastructure/service'
import { RunController } from './controller/run.controller'

export const runRoutes = new Hono<HonoType>()
  .get('/', RunController.list)
  .get('/:runId', (c) => RunController.get(c, { runId: c.req.param('runId') }))

export type RunType = typeof runRoutes

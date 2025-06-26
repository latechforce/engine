import { Hono } from 'hono'
import type { HonoType } from '../../../shared/infrastructure/service'
import { RunController } from './controller/run.controller'
import { getRunsQueryValidator } from './middleware/run.middleware'

export const runRoutes = new Hono<HonoType>()
  .get('/', getRunsQueryValidator, (c) => RunController.list(c, { query: c.req.query('q') }))
  .get('/:runId', (c) => RunController.get(c, { runId: c.req.param('runId') }))

export type RunType = typeof runRoutes

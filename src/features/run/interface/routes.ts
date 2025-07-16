import { Hono } from 'hono'
import type { HonoType } from '../../../shared/infrastructure/service'
import { RunController } from './controller/run.controller'
import { getRunsQueryValidator, getRunsReplayJsonValidator } from './middleware/run.middleware'

export const runRoutes = new Hono<HonoType>()
  .get('/', getRunsQueryValidator, (c) =>
    RunController.list(c, {
      search: c.req.query('search') || '',
      pageIndex: Number(c.req.query('pageIndex') || 0),
      pageSize: Number(c.req.query('pageSize') || 10),
    })
  )
  .get('/:runId', (c) => RunController.get(c, { runId: c.req.param('runId') }))
  .post('/replay', getRunsReplayJsonValidator, (c) => RunController.replay(c, c.req.valid('json')))

export type RunType = typeof runRoutes

import { Hono } from 'hono'
import type { HonoType } from '@/shared/infrastructure/service'
import { RunController } from '@/run/interface/controller/run.controller'

export const runRoutes = new Hono<HonoType>()
  .get('/', RunController.list)
  .get('/:id', RunController.get)

export type RunType = typeof runRoutes

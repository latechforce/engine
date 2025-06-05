import { Hono } from 'hono'
import type { HonoType } from '../../../shared/infrastructure/service'
import { FormController } from './controller/form.controller'

export const formRoutes = new Hono<HonoType>()
  .get('/', FormController.list)
  .get('/:path', (c) => FormController.get(c, { path: c.req.param('path') }))

export type FormType = typeof formRoutes

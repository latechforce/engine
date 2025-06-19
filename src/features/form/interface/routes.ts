import { Hono } from 'hono'
import type { HonoType } from '../../../shared/infrastructure/service'
import { FormController } from './controller/form.controller'

export const formRoutes = new Hono<HonoType>()
  .get('/', FormController.list)
  .get('/:pathOrId', (c) => FormController.get(c, { pathOrId: c.req.param('pathOrId') }))

export type FormType = typeof formRoutes

import { Hono } from 'hono'
import type { HonoType } from '@/shared/infrastructure/service'
import { FormController } from '@/form/interface/controller/form.controller'

export const formRoutes = new Hono<HonoType>()
  .get('/', FormController.list)
  .get('/:path', FormController.get)

export type FormType = typeof formRoutes

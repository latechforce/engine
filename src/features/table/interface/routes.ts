import { Hono } from 'hono'
import type { HonoType } from '@/shared/infrastructure/service'
import { TableController } from '@/table/interface/controller/table.controller'

export const tableRoutes = new Hono<HonoType>().post('/:tableId', TableController.createRecord)

export type TableType = typeof tableRoutes

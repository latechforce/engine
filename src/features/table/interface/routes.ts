import { Hono } from 'hono'
import type { HonoType } from '@/shared/infrastructure/service'
import { TableController } from '@/table/interface/controller/table.controller'

export const tableRoutes = new Hono<HonoType>()
  .get('/', TableController.list)
  .post('/:tableId', TableController.createRecord)
  .get('/:tableId/:recordId', TableController.readRecord)
  .get('/:tableId', TableController.listRecords)
  .patch('/:tableId/:recordId', TableController.updateRecord)
  .patch('/:tableId', TableController.updateMultipleRecords)
  .delete('/:tableId/:recordId', TableController.deleteRecord)
  .delete('/:tableId', TableController.deleteMultipleRecords)

export type TableType = typeof tableRoutes

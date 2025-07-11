import { Hono } from 'hono'
import type { HonoType } from '../../../shared/infrastructure/service'
import { TableController } from './controller/table.controller'
import {
  createRecordFormValidator,
  createRecordJsonValidator,
  deleteRecordsQueryValidator,
  updateRecordFormValidator,
  updateRecordJsonValidator,
} from './middleware/table.middleware'
import { authRequiredMiddleware } from '../../user/interface/middleware/auth.middleware'

export const tableRoutes = new Hono<HonoType>()
  .get('/', authRequiredMiddleware, TableController.list)
  .post('/:tableId', authRequiredMiddleware, createRecordJsonValidator, (c) =>
    TableController.createRecord(c, {
      tableId: c.req.param('tableId'),
      body: c.req.valid('json'),
    })
  )
  .post('/:tableId/form', createRecordFormValidator, (c) =>
    TableController.createRecord(c, {
      tableId: c.req.param('tableId'),
      body: c.req.valid('form'),
    })
  )
  .get('/:tableId/:recordId', authRequiredMiddleware, (c) =>
    TableController.readRecord(c, {
      tableId: c.req.param('tableId'),
      recordId: c.req.param('recordId'),
    })
  )
  .get('/:tableId', authRequiredMiddleware, (c) =>
    TableController.listRecords(c, { tableId: c.req.param('tableId') })
  )
  .patch('/:tableId/:recordId', authRequiredMiddleware, updateRecordJsonValidator, (c) =>
    TableController.updateRecord(c, {
      tableId: c.req.param('tableId'),
      recordId: c.req.param('recordId'),
      body: c.req.valid('json'),
    })
  )
  .patch('/:tableId/:recordId/form', authRequiredMiddleware, updateRecordFormValidator, (c) =>
    TableController.updateRecord(c, {
      tableId: c.req.param('tableId'),
      recordId: c.req.param('recordId'),
      body: c.req.valid('form'),
    })
  )
  .patch('/:tableId', authRequiredMiddleware, (c) =>
    TableController.updateMultipleRecords(c, { tableId: c.req.param('tableId') })
  )
  .delete('/:tableId/:recordId', authRequiredMiddleware, (c) =>
    TableController.deleteRecord(c, {
      tableId: c.req.param('tableId'),
      recordId: c.req.param('recordId'),
    })
  )
  .delete('/:tableId', authRequiredMiddleware, deleteRecordsQueryValidator, (c) =>
    TableController.deleteMultipleRecords(c, {
      tableId: c.req.param('tableId'),
      ids: c.req.valid('query').ids,
    })
  )

export type TableType = typeof tableRoutes

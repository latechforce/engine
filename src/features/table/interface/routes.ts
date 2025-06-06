import { Hono } from 'hono'
import type { HonoType } from '../../../shared/infrastructure/service'
import { TableController } from './controller/table.controller'
import {
  createRecordFormValidator,
  createRecordJsonValidator,
  updateRecordFormValidator,
  updateRecordJsonValidator,
} from './middleware/table.middleware'

export const tableRoutes = new Hono<HonoType>()
  .get('/', TableController.list)
  .post('/:tableId', createRecordJsonValidator, (c) =>
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
  .get('/:tableId/:recordId', (c) =>
    TableController.readRecord(c, {
      tableId: c.req.param('tableId'),
      recordId: c.req.param('recordId'),
    })
  )
  .get('/:tableId', (c) => TableController.listRecords(c, { tableId: c.req.param('tableId') }))
  .patch('/:tableId/:recordId', updateRecordJsonValidator, (c) =>
    TableController.updateRecord(c, {
      tableId: c.req.param('tableId'),
      recordId: c.req.param('recordId'),
      body: c.req.valid('json'),
    })
  )
  .patch('/:tableId/:recordId/form', updateRecordFormValidator, (c) =>
    TableController.updateRecord(c, {
      tableId: c.req.param('tableId'),
      recordId: c.req.param('recordId'),
      body: c.req.valid('form'),
    })
  )
  .patch('/:tableId', (c) =>
    TableController.updateMultipleRecords(c, { tableId: c.req.param('tableId') })
  )
  .delete('/:tableId/:recordId', (c) =>
    TableController.deleteRecord(c, {
      tableId: c.req.param('tableId'),
      recordId: c.req.param('recordId'),
    })
  )
  .delete('/:tableId', (c) =>
    TableController.deleteMultipleRecords(c, {
      tableId: c.req.param('tableId'),
      ids: c.req.queries('ids') || [],
    })
  )

export type TableType = typeof tableRoutes

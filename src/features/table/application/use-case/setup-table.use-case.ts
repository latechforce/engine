import TYPES from '../di/types'
import { injectable, inject } from 'inversify'
import type { Table } from '@/table/domain/entity/table.entity'
import type {
  ITableRepository,
  TableTransaction,
} from '@/table/domain/repository-interface/table-repository.interface'
import { join } from 'path'
import { z } from 'zod'

@injectable()
export class SetupTableUseCase {
  constructor(
    @inject(TYPES.Repository.Table)
    private readonly tableRepository: ITableRepository
  ) {}

  async execute(table: Table) {
    const { schema, fields } = table
    this.tableRepository.debug(`setup table "${schema.name}"`)

    // Setup table
    await this.tableRepository.transaction(async (tx: TableTransaction) => {
      const exists = await tx.exists(schema.id)
      if (exists) {
        await tx.update(table)
        for (const field of fields) {
          if (await tx.field.exists(field.schema.id)) {
            await tx.field.update(field)
          } else {
            await tx.field.create(schema.id, field)
          }
        }
      } else {
        await tx.create(table)
        for (const field of fields) {
          await tx.field.create(schema.id, field)
        }
      }
      await tx.createView(table)
    })

    this.tableRepository.addOpenAPIRoute({
      summary: 'Create record(s)',
      method: 'post',
      path: '/' + join('tables', table.schema.name),
      description: `Create a new record in the table "${table.schema.name}"`,
      tags: [`Table "${table.schema.name}"`],
      requestBody: {
        content: {
          'application/json': {
            schema: table.getSingleOrMultipleCreateRecordSchema(),
          },
        },
      },
      responses: {
        201: {
          description: 'The record was created successfully',
          content: {
            'application/json': {
              schema: table.getSingleOrMultipleReadRecordSchema(),
            },
          },
        },
        400: {
          description: 'The request body is invalid',
          content: {
            'application/json': {
              schema: z.object({
                error: z.enum(['Invalid record', 'Invalid content type']),
              }),
            },
          },
        },
        404: {
          description: 'The table was not found',
          content: {
            'application/json': {
              schema: z.object({
                error: z.literal('Table not found'),
              }),
            },
          },
        },
      },
    })

    this.tableRepository.addOpenAPIRoute({
      summary: 'Get record',
      method: 'get',
      path: '/' + join('tables', table.schema.name, '{recordId}'),
      description: `Get a record from the table "${table.schema.name}"`,
      tags: [`Table "${table.schema.name}"`],
      responses: {
        200: {
          description: 'The record was retrieved successfully',
          content: {
            'application/json': {
              schema: table.getSingleReadRecordSchema(),
            },
          },
        },
        404: {
          description: 'The table or record was not found',
          content: {
            'application/json': {
              schema: z.object({
                error: z.enum(['Table not found', 'Record not found']),
              }),
            },
          },
        },
      },
    })

    this.tableRepository.addOpenAPIRoute({
      summary: 'List records',
      method: 'get',
      path: '/' + join('tables', table.schema.name),
      description: `List records from the table "${table.schema.name}"`,
      tags: [`Table "${table.schema.name}"`],
      responses: {
        200: {
          description: 'The record was retrieved successfully',
          content: {
            'application/json': {
              schema: table.getMultipleReadRecordSchema(),
            },
          },
        },
        404: {
          description: 'The table was not found',
          content: {
            'application/json': {
              schema: z.object({
                error: z.enum(['Table not found']),
              }),
            },
          },
        },
      },
    })

    this.tableRepository.addOpenAPIRoute({
      summary: 'Update record',
      method: 'patch',
      path: '/' + join('tables', table.schema.name, '{recordId}'),
      description: `Update a record in the table "${table.schema.name}"`,
      tags: [`Table "${table.schema.name}"`],
      requestBody: {
        content: {
          'application/json': {
            schema: table.getSingleUpdateRecordSchema(),
          },
        },
      },
      responses: {
        200: {
          description: 'The record was created successfully',
          content: {
            'application/json': {
              schema: table.getSingleReadRecordSchema(),
            },
          },
        },
        400: {
          description: 'The request body is invalid',
          content: {
            'application/json': {
              schema: z.object({
                error: z.enum(['Invalid record', 'Invalid content type']),
              }),
            },
          },
        },
        404: {
          description: 'The table or record was not found',
          content: {
            'application/json': {
              schema: z.object({
                error: z.enum(['Table not found', 'Record not found']),
              }),
            },
          },
        },
      },
    })

    this.tableRepository.addOpenAPIRoute({
      summary: 'Update multiple records',
      method: 'patch',
      path: '/' + join('tables', table.schema.name),
      description: `Update multiple records in the table "${table.schema.name}"`,
      tags: [`Table "${table.schema.name}"`],
      requestBody: {
        content: {
          'application/json': {
            schema: table.getMultipleUpdateRecordSchema(),
          },
        },
      },
      responses: {
        200: {
          description: 'The record was created successfully',
          content: {
            'application/json': {
              schema: table.getMultipleReadRecordSchema(),
            },
          },
        },
        400: {
          description: 'The request body is invalid',
          content: {
            'application/json': {
              schema: z.object({
                error: z.enum(['Invalid record', 'Invalid content type']),
              }),
            },
          },
        },
        404: {
          description: 'The table or record was not found',
          content: {
            'application/json': {
              schema: z.object({
                error: z.enum(['Table not found', 'Record not found']),
              }),
            },
          },
        },
      },
    })
  }
}

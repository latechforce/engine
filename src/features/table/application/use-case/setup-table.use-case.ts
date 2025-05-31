import TYPES from '../di/types'
import { injectable, inject } from 'inversify'
import type { Table } from '@/table/domain/entity/table.entity'
import type {
  ITableRepository,
  TableTransaction,
} from '@/table/domain/repository-interface/table-repository.interface'
import { join } from 'path'
import type { SchemaObject } from 'ajv'

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
      method: 'post',
      path: '/' + join('tables', table.slug),
      description: `Create a new record in the table "${table.schema.name}"`,
      tags: ['Tables'],
      requestBody: {
        content: {
          'application/json': {
            schema: table.getRecordFieldsSchema() as SchemaObject,
          },
        },
      },
      responses: {
        200: {
          description: 'The record was created successfully',
        },
      },
    })

    this.tableRepository.addOpenAPIRoute({
      method: 'get',
      path: '/' + join('tables', table.slug, '{recordId}'),
      description: `Get a record from the table "${table.schema.name}"`,
      tags: ['Tables'],
      responses: {
        200: {
          description: 'The record was retrieved successfully',
        },
      },
    })
  }
}

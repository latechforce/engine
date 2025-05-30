import TYPES from '../di/types'
import { injectable, inject } from 'inversify'
import type { Table } from '@/table/domain/entity/table.entity'
import type { ITableRepository } from '@/table/domain/repository-interface/table-repository.interface'

@injectable()
export class SetupTableUseCase {
  constructor(
    @inject(TYPES.Repository.Table)
    private readonly tableRepository: ITableRepository
  ) {}

  async execute(table: Table) {
    const { schema } = table
    this.tableRepository.debug(`setup table "${schema.name}"`)
    await this.tableRepository.transaction(async (tx) => {
      const exists = await tx.exists(schema.id)
      if (exists) {
        await tx.update(table)
        for (const field of schema.fields) {
          if (await tx.field.exists(field.id)) {
            await tx.field.update(field)
          } else {
            await tx.field.create(schema.id, field)
          }
        }
      } else {
        await tx.create(table)
        for (const field of schema.fields) {
          await tx.field.create(schema.id, field)
        }
      }
    })
  }
}

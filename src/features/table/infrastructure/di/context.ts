import { inject, injectable } from 'inversify'
import type { Context } from 'hono'
import type { CreateTableRecordUseCase } from '@/table/application/use-case/create-table-record.use-case'
import TYPES from '@/table/application/di/types'

export type TableHonoContextType = {
  createTableRecordUseCase: CreateTableRecordUseCase
}

@injectable()
export class TableHonoContext {
  constructor(
    @inject(TYPES.UseCase.CreateRecord)
    private readonly createTableRecordUseCase: CreateTableRecordUseCase
  ) {}

  setVariables(c: Context) {
    c.set('createTableRecordUseCase', this.createTableRecordUseCase)
  }
}

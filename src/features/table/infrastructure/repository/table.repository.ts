import type { Table } from '@/table/domain/entity/table.entity'
import TYPES from '@/shared/infrastructure/di/types'
import type { ITableRepository } from '@/table/domain/repository-interface/table-repository.interface'
import { inject, injectable } from 'inversify'
import type { LoggerService } from '@/shared/infrastructure/service/logger.service'

@injectable()
export class TableRepository implements ITableRepository {
  constructor(
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService
  ) {}

  debug(message: string) {
    this.logger.child('table-repository').debug(message)
  }

  async setup(table: Table) {
    this.logger.info(`setup table "${table.schema.name}"`)
  }
}

import type { Table } from '@/domain/entity/table.entity'
import TYPES from '../di/types'
import type { LoggerService } from '../service/logger.service'
import type { ITableRepository } from '@/domain/repository-interface/table-repository.interface'
import { inject, injectable } from 'inversify'

@injectable()
export class TableRepository implements ITableRepository {
  constructor(
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService
  ) {
    this.logger = this.logger.child('table-repository')
  }

  debug(message: string) {
    this.logger.debug(message)
  }

  async setup(table: Table) {
    this.logger.info(`setup table "${table.name}"`)
  }
}

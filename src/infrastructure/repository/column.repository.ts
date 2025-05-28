import type { IColumnRepository } from '@/domain/repository-interface/column-repository.interface'
import TYPES from '../di/types'
import type { LoggerService } from '../service/logger.service'
import { inject, injectable } from 'inversify'
import type { Column } from '@/domain/entity/column.entity'

@injectable()
export class ColumnRepository implements IColumnRepository {
  constructor(
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService
  ) {
    this.logger = this.logger.child('field-repository')
  }

  debug(message: string) {
    this.logger.debug(message)
  }

  async setup(_field: Column) {}
}

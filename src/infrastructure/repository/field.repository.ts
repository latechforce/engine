import type { IFieldRepository } from '@/domain/repository-interface/field-repository.interface'
import TYPES from '../di/types'
import type { LoggerService } from '../service/logger.service'
import { inject, injectable } from 'inversify'
import type { Field } from '@/domain/entity/field.entity'

@injectable()
export class FieldRepository implements IFieldRepository {
  constructor(
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService
  ) {
    this.logger = this.logger.child('field-repository')
  }

  debug(message: string) {
    this.logger.debug(message)
  }

  async setup(_field: Field) {}
}

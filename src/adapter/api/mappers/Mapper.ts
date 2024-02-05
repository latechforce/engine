import type { SchemaValidatorErrorDto } from '@adapter/spi/dtos/SchemaValidatorErrorDto'
import type { EngineErrorCode } from '@domain/entities/EngineError'
import type { Services } from '@domain/services'

export interface Mapper<Dto, Error, Entity> {
  toEntity: (dto: Dto, services: Services, ...args: string[]) => Entity
  toManyEntities: (dtos: Dto[], services: Services, ...args: string[]) => Entity[]
  toErrorEntity: (errorDto: SchemaValidatorErrorDto) => Error
  toManyErrorEntities: (errorDtos: SchemaValidatorErrorDto[]) => Error[]
  toErrorEntityFromCode: (code: EngineErrorCode) => Error
}

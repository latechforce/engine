import { RecordMapper } from '/adapter/spi/mappers/RecordMapper'
import { FilterMapper } from '../mappers/FilterMapper'
import type { Filter, FilterDto } from '/domain/entities/Filter'
import type { IDatabaseTableSpi, ListParams } from '/domain/services/DatabaseTable'
import type {
  PersistedRecordFieldsDto,
  RecordFieldsToCreateDto,
  RecordFieldsToUpdateDto,
} from '../dtos/RecordDto'
import type {
  RecordFields,
  RecordFieldsToCreate,
  RecordFieldsToUpdate,
} from '/domain/entities/Record'
import type { FieldConfig } from '/domain/entities/Field'
import type { OrderConfig } from '/domain/entities/Filter/Order'
import type { PageConfig } from '/domain/entities/Filter/Page'

export interface IDatabaseTableDriver {
  name: string
  schema: string
  nameWithSchema: string
  fields: FieldConfig[]
  exists: () => Promise<boolean>
  create: () => Promise<void>
  dropView: () => Promise<void>
  migrate: () => Promise<void>
  createView: () => Promise<void>
  insert: <T extends RecordFields>(record: RecordFieldsToCreateDto<T>) => Promise<void>
  insertMany: <T extends RecordFields>(records: RecordFieldsToCreateDto<T>[]) => Promise<void>
  update: <T extends RecordFields>(record: RecordFieldsToUpdateDto<T>) => Promise<void>
  updateMany: <T extends RecordFields>(records: RecordFieldsToUpdateDto<T>[]) => Promise<void>
  delete: (id: string) => Promise<void>
  read: <T extends RecordFields>(
    filter: FilterDto
  ) => Promise<PersistedRecordFieldsDto<T> | undefined>
  readById: <T extends RecordFields>(id: string) => Promise<PersistedRecordFieldsDto<T> | undefined>
  list: <T extends RecordFields>(
    filter?: FilterDto,
    order?: OrderConfig[],
    page?: PageConfig
  ) => Promise<PersistedRecordFieldsDto<T>[]>
  count: (params: CountParams) => Promise<number>
}

export interface CountParams {
  filter?: FilterDto
}

export class DatabaseTableSpi implements IDatabaseTableSpi {
  constructor(private _driver: IDatabaseTableDriver) {}

  get schema() {
    return this._driver.schema
  }

  get nameWithSchema() {
    return this._driver.nameWithSchema
  }

  exists = async () => {
    return this._driver.exists()
  }

  create = async () => {
    await this._driver.create()
  }

  dropView = async () => {
    await this._driver.dropView()
  }

  migrate = async () => {
    await this._driver.migrate()
  }

  createView = async () => {
    await this._driver.createView()
  }

  insert = async <T extends RecordFields>(record: RecordFieldsToCreate<T>) => {
    const recordDto = RecordMapper.toCreateDto<T>(record)
    await this._driver.insert(recordDto)
  }

  insertMany = async <T extends RecordFields>(records: RecordFieldsToCreate<T>[]) => {
    const recordsDto = RecordMapper.toManyCreateDto<T>(records)
    await this._driver.insertMany(recordsDto)
  }

  update = async <T extends RecordFields>(record: RecordFieldsToUpdate<T>) => {
    const recordDto = RecordMapper.toUpdateDto<T>(record)
    await this._driver.update(recordDto)
  }

  updateMany = async <T extends RecordFields>(records: RecordFieldsToUpdate<T>[]) => {
    const recordsDto = RecordMapper.toManyUpdateDto<T>(records)
    await this._driver.updateMany(recordsDto)
  }

  delete = async (id: string) => {
    await this._driver.delete(id)
  }

  read = async <T extends RecordFields>(filter: Filter) => {
    const filterDto = FilterMapper.toDto(filter)
    const persistedRecordDto = await this._driver.read<T>(filterDto)
    if (!persistedRecordDto) return undefined
    return RecordMapper.toEntity<T>(persistedRecordDto)
  }

  readById = async <T extends RecordFields>(id: string) => {
    const persistedRecordDto = await this._driver.readById<T>(id)
    if (!persistedRecordDto) return undefined
    return RecordMapper.toEntity<T>(persistedRecordDto)
  }

  list = async <T extends RecordFields>(params?: ListParams) => {
    const persistedRecordsDtos = await this._driver.list<T>(
      params?.filter ? FilterMapper.toDto(params.filter) : undefined,
      params?.order,
      params?.page
    )
    return RecordMapper.toManyEntity<T>(persistedRecordsDtos)
  }

  count = async (params: CountParams) => {
    const persistedRecordsDtos = await this._driver.count(params)
    return persistedRecordsDtos
  }
}

import { OrmGatewayAbstract } from '@application/gateways/OrmGatewayAbstract'
import { OrmConnection } from './OrmConnection'
import { Orm } from './Orm'
import { Record } from '@domain/entities/app/Record'
import { Filter } from '@domain/entities/app/Filter'
import { RecordMapper } from './mappers/RecordMapper'
import { FilterMapper } from './mappers/FilterMapper'
import { App } from '@domain/entities/app/App'
import { TableMapper } from '@adapter/api/table/mappers/TableMapper'

export class OrmGateway implements OrmGatewayAbstract {
  private ormConnection: OrmConnection

  constructor(
    orm: Orm,
    private app: App
  ) {
    const tablesDto = TableMapper.toDtos(app.tables)
    this.ormConnection = new OrmConnection(orm, tablesDto)
  }

  async tableExists(table: string) {
    return this.ormConnection.tableExists(table)
  }

  async create(table: string, record: Record) {
    const recordDto = RecordMapper.toDto(record)
    return this.ormConnection.create(table, recordDto)
  }

  async createMany(table: string, records: Record[]) {
    const recordsDto = RecordMapper.toDtos(records)
    return this.ormConnection.createMany(table, recordsDto)
  }

  async update(table: string, record: Record, id: string) {
    const recordDto = RecordMapper.toDto(record)
    return this.ormConnection.update(table, recordDto, id)
  }

  async list(table: string, filters: Filter[]) {
    const filtersDto = FilterMapper.toDtos(filters)
    const recordsDto = await this.ormConnection.list(table, filtersDto)
    return RecordMapper.toEntities(recordsDto, this.app.getTableByName(table))
  }

  async read(table: string, id: string) {
    const recordDto = await this.ormConnection.read(table, id)
    if (!recordDto) return undefined
    return RecordMapper.toEntity(recordDto, this.app.getTableByName(table))
  }
}

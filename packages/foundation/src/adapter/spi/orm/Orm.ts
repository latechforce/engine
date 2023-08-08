import { TableDto } from '@adapter/api/table/dtos/TableDto'
import { RecordDto } from '../../api/app/dtos/RecordDto'
import { FilterDto } from '../../api/app/dtos/FilterDto'

export interface Orm {
  configure(tables: TableDto[]): void
  tableExists(tableName: string): boolean
  create(table: string, record: RecordDto): Promise<string>
  createMany(table: string, record: RecordDto[]): Promise<string[]>
  softUpdateById(table: string, record: RecordDto, id: string): Promise<void>
  softUpdateMany(table: string, records: RecordDto[]): Promise<void>
  list(table: string, filters: FilterDto[]): Promise<RecordDto[]>
  readById(table: string, id: string): Promise<RecordDto | undefined>
}
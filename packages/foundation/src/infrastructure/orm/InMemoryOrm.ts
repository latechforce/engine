import fs from 'fs-extra'
import { join } from 'path'
import { Orm } from '@adapter/spi/orm/Orm'
import { TableDto } from '@adapter/api/table/dtos/TableDto'
import { RecordDto, RecordFieldValue } from '@adapter/spi/orm/dtos/RecordDto'
import { FilterDto } from '@adapter/spi/orm/dtos/FilterDto'

interface TableRecord {
  [key: string]: RecordFieldValue
}
interface Database {
  [key: string]: TableRecord[]
}

export class InMemoryOrm implements Orm {
  private url: string
  private tables: TableDto[] = []

  constructor(folder: string) {
    this.url = join(folder, 'db.json')
    fs.ensureFileSync(this.url)
  }

  public configure(tables: TableDto[]): void {
    this.tables = tables
  }

  public tableExists(tableName: string): boolean {
    return this.tables.some((table) => table.name === tableName)
  }

  private getTable(tableName: string): TableDto {
    const table = this.tables.find((table) => table.name === tableName)
    if (!table) throw new Error(`Table ${tableName} not found`)
    return table
  }

  public async getDB(): Promise<Database> {
    return (await fs.readJSON(this.url, { throws: false })) ?? {}
  }

  public async setDB(db: Database): Promise<void> {
    return fs.writeJSON(this.url, db)
  }

  async create(tableName: string, recordDto: RecordDto): Promise<string> {
    const db = await this.getDB()
    if (!db[tableName]) db[tableName] = []
    db[tableName].push(recordDto)
    await this.setDB(db)
    return String(recordDto.id)
  }

  async createMany(table: string, recordsDto: RecordDto[]): Promise<string[]> {
    const db = await this.getDB()
    if (!db[table]) db[table] = []
    db[table].push(...recordsDto)
    await this.setDB(db)
    return recordsDto.map((recordDto) => String(recordDto.id))
  }

  async softUpdateById(table: string, recordDto: RecordDto, id: string): Promise<void> {
    const db = await this.getDB()
    if (!db[table]) db[table] = []
    const index = db[table].findIndex((row) => row.id === id)
    if (index === -1) throw new Error(`Record ${id} not found`)
    db[table][index] = { ...db[table][index], ...recordDto }
    await this.setDB(db)
  }

  async list(table: string, filters: FilterDto[]): Promise<RecordDto[]> {
    const db = await this.getDB()
    if (!db[table]) db[table] = []
    const recordsDto = db[table]
    if (filters.length === 0) return recordsDto
    return recordsDto.filter((recordDto) => {
      for (const filter of filters) {
        const value = recordDto[filter.field]
        const field = this.getTable(table).fields.find((field) => field.name === filter.field)
        if (filter.operator === 'is_any_of') {
          if (!Array.isArray(filter.value)) throw new Error('Value must be an array')
          if (filter.field === 'id' || field?.format === 'text')
            return filter.value.map((v) => String(v)).filter((v: string) => v === value).length > 0
          if (field?.format === 'number')
            return filter.value.map((v) => Number(v)).filter((v: number) => v === value).length > 0
        }
        throw new Error(`Operator ${filter.operator} not supported`)
      }
    })
  }

  async deleteById(table: string, id: string): Promise<void> {
    const db = await this.getDB()
    if (!db[table]) db[table] = []
    const index = db[table].findIndex((recordDto) => recordDto.id === id)
    if (index === -1) throw new Error(`Record not found for id ${id} in table ${table}`)
    db[table].splice(index, 1)
    await this.setDB(db)
  }

  async readById(table: string, id: string): Promise<RecordDto | undefined> {
    const db = await this.getDB()
    if (!db[table]) db[table] = []
    const recordDto = db[table].find((row) => row.id === id)
    if (!recordDto) return undefined
    return recordDto
  }
}

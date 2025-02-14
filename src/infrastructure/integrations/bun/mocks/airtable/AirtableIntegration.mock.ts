import type { IAirtableIntegration } from '/adapter/spi/integrations/AirtableSpi'
import { AirtableTableIntegration } from './AirtableTableIntegration.mock'
import type { AirtableConfig } from '/domain/integrations/Airtable'
import { SQLiteDatabaseDriver } from '/infrastructure/drivers/bun/DatabaseDriver/SQLiteDriver'
import type { SQLiteDatabaseTableDriver } from '/infrastructure/drivers/bun/DatabaseDriver/SQLiteTableDriver'
import type { RecordFields } from '/domain/entities/Record'
import type { IField } from '/domain/interfaces/IField'
import slugify from 'slugify'
import type { AirtableTableRecordFields } from '/domain/integrations/Airtable/AirtableTableRecord'

export interface TableObject extends RecordFields {
  name: string
  fields: string
}

export class AirtableIntegration implements IAirtableIntegration {
  private _db: SQLiteDatabaseDriver
  private _tables?: SQLiteDatabaseTableDriver

  constructor(private _config?: AirtableConfig) {
    this._db = new SQLiteDatabaseDriver({ url: _config?.apiKey ?? ':memory:', driver: 'SQLite' })
  }

  connect = async () => {
    await this._db.connect()
    this._tables = this._db.table({
      name: 'tables',
      fields: [
        {
          name: 'name',
          type: 'SingleLineText',
        },
        {
          name: 'fields',
          type: 'LongText',
        },
      ],
    })
    if (!(await this._tables.exists())) {
      await this._tables.create()
      await this._tables.createView()
    }
  }

  getConfig = (): AirtableConfig => {
    if (!this._config) {
      throw new Error('Airtable config not set')
    }
    return this._config
  }

  getTable = async <T extends AirtableTableRecordFields>(tableName: string) => {
    const id = this._slugify(tableName)
    const tables = await this._tablesOrThrow()
    const table = await tables.readById<TableObject>(id)
    if (!table) {
      throw new Error('Table not found')
    }
    const { fields: jsonFields } = table.fields
    const fields = JSON.parse(String(jsonFields))
    const airtableTable = new AirtableTableIntegration<T>(
      this._db.table({
        name: id,
        fields,
      }),
      table
    )
    const exist = await airtableTable.exists()
    if (!exist) {
      await airtableTable.create()
      await airtableTable.createView()
    }
    return airtableTable
  }

  addTable = async <T extends AirtableTableRecordFields>(name: string, fields: IField[]) => {
    const tables = await this._tablesOrThrow()
    const id = this._slugify(name)
    await tables.insert<TableObject>({
      id,
      fields: { name, fields: JSON.stringify(fields) },
      created_at: new Date().toISOString(),
    })
    return this.getTable<T>(name)
  }

  private _slugify = (name: string) => {
    return slugify(name, { lower: true, replacement: '_', strict: true })
  }

  private _tablesOrThrow = async () => {
    if (!this._tables) {
      await this.connect()
      if (!this._tables) {
        throw new Error('Tables table not set')
      }
    }
    return this._tables
  }
}

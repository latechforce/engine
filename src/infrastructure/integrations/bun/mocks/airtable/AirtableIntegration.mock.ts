import type { IAirtableIntegration } from '/adapter/spi/integrations/AirtableSpi'
import { AirtableTableIntegration } from './AirtableTableIntegration.mock'
import type { AirtableConfig, AirtableTableRecordFields } from '/domain/integrations/Airtable'
import { SQLiteDatabaseDriver } from '../../../../drivers/bun/DatabaseDriver/SQLite/SQLiteDriver'
import type { SQLiteDatabaseTableDriver } from '../../../../drivers/bun/DatabaseDriver/SQLite/SQLiteTableDriver'
import type { RecordFields } from '/domain/entities/Record'
import type { IField } from '/domain/interfaces/IField'
import slugify from 'slugify'

export interface TableObject extends RecordFields {
  name: string
  fields: string
}

export class AirtableIntegration implements IAirtableIntegration {
  private _db: SQLiteDatabaseDriver
  private _tables?: SQLiteDatabaseTableDriver
  private _users?: SQLiteDatabaseTableDriver

  constructor(public config: AirtableConfig) {
    this._db = new SQLiteDatabaseDriver({ url: config.baseUrl ?? ':memory:', driver: 'SQLite' })
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
    this._users = this._db.table({
      name: 'users',
      fields: [{ name: 'apiKey', type: 'SingleLineText' }],
    })
    if (!(await this._users.exists())) {
      await this._users.create()
      await this._users.createView()
    }
  }

  testConnection = async () => {
    const user = await this._users?.readById(this.config.apiKey)
    if (!user) {
      return { error: { status: 404, message: 'User not found' } }
    }
    return undefined
  }

  addUser = async (user: { apiKey: string }) => {
    await this._users?.insert({
      id: user.apiKey,
      fields: { apiKey: user.apiKey },
      created_at: new Date().toISOString(),
    })
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

import type { IAirtableIntegration } from '/adapter/spi/integrations/AirtableSpi'
import { AirtableTableIntegration } from './AirtableTableIntegration.mock'
import type { AirtableConfig, AirtableTableRecordFields } from '/domain/integrations/Airtable'
import type { SQLiteDatabaseTableDriver } from '../../../../drivers/bun/DatabaseDriver/SQLite/SQLiteTableDriver'
import type { RecordFields } from '/domain/entities/Record'
import type { FieldConfig } from '/domain/entities/Field'
import { BaseMockIntegration } from '../base'
import slugify from 'slugify'

export interface TableObject extends RecordFields {
  name: string
  fields: string
}

export class AirtableIntegration extends BaseMockIntegration implements IAirtableIntegration {
  private _tables: SQLiteDatabaseTableDriver

  constructor(public config: AirtableConfig) {
    super(config, config.apiKey)
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
    this._tables.ensureSync()
  }

  getTable = async <T extends AirtableTableRecordFields>(tableName: string) => {
    const id = this._slugify(tableName)
    const table = await this._tables.readById<TableObject>(id)
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
    await airtableTable.ensure()
    return airtableTable
  }

  addTable = async <T extends AirtableTableRecordFields>(name: string, fields: FieldConfig[]) => {
    const id = this._slugify(name)
    await this._tables.insert<TableObject>({
      id,
      fields: { name, fields: JSON.stringify(fields) },
      created_at: new Date().toISOString(),
    })
    return this.getTable<T>(name)
  }

  private _slugify = (name: string) => {
    return slugify(name, { lower: true, replacement: '_', strict: true })
  }
}

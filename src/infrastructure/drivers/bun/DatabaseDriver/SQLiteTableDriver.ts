import { Database } from 'bun:sqlite'
import type { IDatabaseTableDriver } from '/adapter/spi/drivers/DatabaseTableSpi'
import type { FilterDto } from '/domain/entities/Filter'
import type { RecordFields, RecordFieldValue } from '/domain/entities/Record'
import type {
  PersistedRecordFieldsDto,
  RecordFieldsToCreateDto,
  RecordFieldsToUpdateDto,
} from '/adapter/spi/dtos/RecordDto'
import type { ITable } from '/domain/interfaces/ITable'
import type { IField } from '/domain/interfaces/IField'
import slugify from 'slugify'

interface ColumnInfo {
  name: string
  type: string
  required: number
}

interface Column {
  name: string
  type: 'TEXT' | 'TIMESTAMP' | 'NUMERIC' | 'BOOLEAN' | 'TEXT[]'
  formula?: string
  options?: string[]
  required?: boolean
  table?: string
  tableField?: string
  onMigration?: {
    replace?: string
  }
}

type Row = {
  id: string
  created_at: number
  updated_at?: number
  [key: string]: RecordFieldValue
}

export class SQLiteDatabaseTableDriver implements IDatabaseTableDriver {
  public name: string
  public schemaName: string
  public viewName: string
  public fields: IField[]
  public columns: Column[]

  constructor(
    config: ITable,
    private _db: Database
  ) {
    const [schema, table] = config.name.includes('.')
      ? config.name.split('.')
      : ['public', config.name]
    this.name = table
    this.schemaName = schema === 'public' ? table : `${schema}_${table}`
    this.viewName = `${this.schemaName}_view`
    this.fields = [
      ...config.fields,
      {
        name: 'id',
        type: 'SingleLineText',
        required: true,
      },
      {
        name: 'created_at',
        type: 'DateTime',
        required: true,
      },
      {
        name: 'updated_at',
        type: 'DateTime',
      },
    ]
    this.columns = this.fields.map(this._convertFieldToColumn)
  }

  exists = async () => {
    const result = this._db
      .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name = ?`)
      .all(this.schemaName)
    return result.length > 0
  }

  create = async () => {
    const exists = await this.exists()
    if (exists) throw new Error(`Table "${this.schemaName}" already exists`)
    const tableColumns = this._buildColumnsQuery(this.columns)
    const tableQuery = `CREATE TABLE "${this.schemaName}" (${tableColumns})`
    this._db.exec(tableQuery)
    await this._createManyToManyTables()
  }

  migrate = async () => {
    const existingColumns = this._getExistingColumns()
    const staticColumns = this.columns.filter((column) => !this._isViewColumn(column))
    const fieldsToAdd = staticColumns.filter(
      (field) =>
        !existingColumns.some(
          (column) =>
            column.name === field.name ||
            (field.onMigration && field.onMigration.replace === column.name)
        )
    )
    const fieldsToAlter = staticColumns.filter((field) => {
      const existingColumn = existingColumns.find(
        (column) =>
          column.name === field.name ||
          (field.onMigration && field.onMigration.replace === column.name)
      )
      if (!existingColumn) return false
      return (
        existingColumn.type !== field.type ||
        existingColumn.required !== (field.required ? 1 : 0) ||
        (field.onMigration && field.onMigration.replace)
      )
    })
    for (const field of fieldsToAdd) {
      const [column, reference] = this._buildColumnsQuery([field]).split(',')
      const query = `ALTER TABLE "${this.schemaName}" ADD COLUMN ${column}`
      this._db.exec(query)
      if (reference) {
        this._db.exec(
          `ALTER TABLE "${this.schemaName}" ADD CONSTRAINT fk_${field.name} ${reference}`
        )
      }
    }
    if (fieldsToAlter.length > 0) {
      const tempTableName = `${this.schemaName}_temp`
      const newSchema = this._buildColumnsQuery(staticColumns)
      this._db.exec(`DROP TABLE IF EXISTS "${tempTableName}"`)
      this._db.exec(`CREATE TABLE "${tempTableName}" (${newSchema})`)
      for (const field of fieldsToAlter) {
        if (field.onMigration && field.onMigration.replace) {
          const existingColumnWithNewName = existingColumns.find(
            (column) => column.name === field.name
          )
          if (!existingColumnWithNewName) {
            const renameQuery = `ALTER TABLE "${this.schemaName}" RENAME COLUMN ${field.onMigration.replace} TO ${field.name}`
            this._db.exec(renameQuery)
          }
        }
      }
      const columnsToCopy = staticColumns.map((field) => field.name).join(', ')
      this._db.exec(`PRAGMA foreign_keys = OFF`)
      this._db.exec(
        `INSERT INTO "${tempTableName}" (${columnsToCopy}) SELECT ${columnsToCopy} FROM "${this.schemaName}"`
      )
      this._db.exec(`DROP TABLE "${this.schemaName}"`)
      this._db.exec(`ALTER TABLE "${tempTableName}" RENAME TO "${this.schemaName}"`)
      this._db.exec(`PRAGMA foreign_keys = ON`)
    }
    await this._createManyToManyTables()
  }

  createView = async () => {
    try {
      this._db.exec('BEGIN TRANSACTION')
      this._db.exec(`DROP VIEW IF EXISTS "${this.viewName}"`)
      let joins = ''
      const columns = this.fields
        .map((field) => {
          const column = this._convertFieldToColumn(field)
          if (field.type === 'Rollup') {
            const linkedRecordField = this._getLinkedRecordField(field.multipleLinkedRecord)
            const values = `"${linkedRecordField.table}_view".${field.linkedRecordField}`
            const formula = this._convertFormula(field.formula, values)
            const linkedRecordColumn = this._convertFieldToColumn(linkedRecordField)
            const manyToManyTableName = this._getManyToManyTableName(linkedRecordColumn)
            if (!joins.includes(manyToManyTableName)) {
              joins += ` LEFT JOIN "${manyToManyTableName}" ON "${this.schemaName}".id = "${manyToManyTableName}"."${this.schemaName}_id"`
              joins += ` LEFT JOIN "${linkedRecordField.table}_view" ON "${manyToManyTableName}"."${linkedRecordField.table}_id" = "${linkedRecordField.table}_view".id`
            }
            return `CAST(${formula} AS ${column.type}) AS "${column.name}"`
          } else if (field.type === 'Formula') {
            const expandedFormula = this.columns.reduce((acc, f) => {
              const regex = new RegExp(`\\b${f.name}\\b`, 'g')
              return acc.replace(regex, f.formula ? `(${f.formula})` : `"${f.name}"`)
            }, field.formula)
            return `CAST(${expandedFormula} AS ${column.type}) AS "${column.name}"`
          } else if (field.type === 'MultipleLinkedRecord') {
            return `(SELECT GROUP_CONCAT("${column.table}_id") FROM ${this._getManyToManyTableName(column)} WHERE "${this.schemaName}_id" = "${this.schemaName}".id) AS "${column.name}"`
          } else {
            return `"${this.schemaName}".${column.name} AS "${column.name}"`
          }
        })
        .join(', ')
      let query = `CREATE VIEW "${this.viewName}" AS SELECT ${columns} FROM "${this.schemaName}"`
      if (joins) query += joins + ` GROUP BY "${this.schemaName}".id`
      this._db.exec(query)
      this._db.exec('COMMIT')
    } catch (e) {
      this._db.exec('ROLLBACK')
      this._throwError(e)
    }
  }

  dropView = async () => {
    this._db.exec(`DROP VIEW IF EXISTS "${this.viewName}"`)
  }

  insert = async <T extends RecordFields>(record: RecordFieldsToCreateDto<T>) => {
    try {
      this._db.exec('BEGIN TRANSACTION')
      await this._insert<T>(record)
      this._db.exec('COMMIT')
    } catch (e) {
      this._db.exec('ROLLBACK')
      this._throwError(e)
    }
  }

  insertMany = async <T extends RecordFields>(records: RecordFieldsToCreateDto<T>[]) => {
    try {
      this._db.exec('BEGIN TRANSACTION')
      for (const record of records) await this._insert<T>(record)
      this._db.exec('COMMIT')
    } catch (e) {
      this._db.exec('ROLLBACK')
      this._throwError(e)
    }
  }

  update = async <T extends RecordFields>(record: RecordFieldsToUpdateDto<T>) => {
    try {
      this._db.exec('BEGIN TRANSACTION')
      await this._update<T>(record)
      this._db.exec('COMMIT')
    } catch (e) {
      this._db.exec('ROLLBACK')
      this._throwError(e)
    }
  }

  updateMany = async <T extends RecordFields>(records: RecordFieldsToUpdateDto<T>[]) => {
    try {
      this._db.exec('BEGIN TRANSACTION')
      for (const record of records) await this._update<T>(record)
      this._db.exec('COMMIT')
    } catch (e) {
      this._db.exec('ROLLBACK')
      this._throwError(e)
    }
  }

  delete = async (id: string) => {
    try {
      const values = [id]
      const query = `DELETE FROM ${this.schemaName} WHERE id = ?`
      this._db.prepare(query).run(...values)
    } catch (e) {
      this._throwError(e)
    }
  }

  read = async <T extends RecordFields>(filter: FilterDto) => {
    const { conditions, values } = this._convertFilterToConditions(filter)
    if (!conditions) return
    const query = `SELECT * FROM "${this.viewName}" ${conditions.length > 0 ? `WHERE ${conditions}` : ''} LIMIT 1`
    const record = this._db.prepare(query).get(...values) as Row | undefined
    return record ? this._postprocess<T>(record) : undefined
  }

  readById = async <T extends RecordFields>(id: string) => {
    const query = `SELECT * FROM "${this.viewName}" WHERE id = ?`
    const record = this._db.prepare(query).get(id) as Row | undefined
    return record ? this._postprocess<T>(record) : undefined
  }

  list = async <T extends RecordFields>(filter?: FilterDto) => {
    const { conditions, values } = filter
      ? this._convertFilterToConditions(filter)
      : { conditions: '', values: [] }
    if (!conditions) {
      const query = `SELECT * FROM "${this.viewName}"`
      const records = this._db.prepare(query).all() as Row[]
      return records.map(this._postprocess<T>)
    }
    const query = `SELECT * FROM "${this.viewName}" WHERE ${conditions}`
    const records = this._db.prepare(query).all(...values) as Row[]
    return records.map(this._postprocess<T>)
  }

  private _insert = async <T extends RecordFields>(record: RecordFieldsToCreateDto<T>) => {
    const { id, created_at, fields } = record
    const { staticColumns, manyToManyColumns } = this._splitColumns({ id, created_at, ...fields })
    const preprocessedFields = this._preprocess(staticColumns)
    const keys = Object.keys(preprocessedFields)
    const values = Object.values(preprocessedFields)
    const placeholders = keys.map(() => `?`).join(', ')
    const query = `INSERT INTO "${this.schemaName}" (${keys.join(', ')}) VALUES (${placeholders})`
    this._db.prepare(query).run(...values)
    if (Object.keys(manyToManyColumns).length > 0) {
      await this._insertManyToManyColumns(record.id, manyToManyColumns)
    }
  }

  private _update = async <T extends RecordFields>(record: RecordFieldsToUpdateDto<T>) => {
    const { id, updated_at, fields } = record
    const { staticColumns, manyToManyColumns } = this._splitColumns({ id, updated_at, ...fields })
    const preprocessedFields = this._preprocess(staticColumns)
    const keys = Object.keys(preprocessedFields)
    const values = Object.values(preprocessedFields)
    const setString = keys.map((key) => `${key} = ?`).join(', ')
    const query = `UPDATE "${this.schemaName}" SET ${setString} WHERE id = ?`
    this._db.prepare(query).run(...values, record.id)
    if (Object.keys(manyToManyColumns).length > 0) {
      await this._updateManyToManyColumns(record.id, manyToManyColumns)
    }
  }

  private _buildColumnsQuery = (columns: Column[]) => {
    const columnsQueries = []
    const references = []
    for (const column of columns) {
      if (this._isViewColumn(column)) continue
      let query = `"${column.name}" ${column.type}`
      if (column.name === 'id') {
        query += ' PRIMARY KEY'
      } else if (column.type === 'TEXT' && column.options) {
        query += ` CHECK ("${column.name}" IN ('${column.options.join("', '")}'))`
      } else if (column.type === 'TEXT' && column.table) {
        references.push(`FOREIGN KEY ("${column.name}") REFERENCES ${column.table}(id)`)
      }
      if (column.required) {
        query += ' NOT NULL'
      }
      columnsQueries.push(query)
    }
    columnsQueries.push(...references)
    return columnsQueries.join(', ')
  }

  private _slugify = (name: string) => {
    return slugify(name, { lower: true, replacement: '_', strict: true })
  }

  private _getManyToManyTableName = (column: Column) => {
    return [this.schemaName, column.table].sort().join('_') + '_' + this._slugify(column.name)
  }

  private _createManyToManyTables = async () => {
    for (const column of this.columns) {
      if (column.type === 'TEXT[]' && column.table) {
        const manyToManyTableName = this._getManyToManyTableName(column)
        const query = `
          CREATE TABLE IF NOT EXISTS ${manyToManyTableName} (
            "${this.schemaName}_id" TEXT NOT NULL,
            "${column.table}_id" TEXT NOT NULL,
            FOREIGN KEY ("${this.schemaName}_id") REFERENCES "${this.schemaName}"(id),
            FOREIGN KEY ("${column.table}_id") REFERENCES "${column.table}"(id)
          )
        `.trim()
        this._db.exec(query)
      }
    }
  }

  private _isViewColumn = (column: Column) => {
    return column.formula || (column.type === 'TEXT[]' && column.table)
  }

  private _splitColumns = (row: Partial<Row>) => {
    const staticColumns: { [key: string]: RecordFieldValue } = {}
    const manyToManyColumns: { [key: string]: string[] } = {}
    for (const [key, value] of Object.entries(row)) {
      const column = this.columns.find((f) => f.name === key)
      if (column?.type === 'TEXT[]' && column.table && Array.isArray(value)) {
        manyToManyColumns[key] = value
      } else {
        staticColumns[key] = value
      }
    }
    return { staticColumns, manyToManyColumns }
  }

  private _insertManyToManyColumns = async (
    recordId: string,
    manyToManyColumns: { [key: string]: string[] }
  ) => {
    for (const [columnName, ids] of Object.entries(manyToManyColumns)) {
      const column = this.columns.find((f) => f.name === columnName)
      const tableName = column?.table
      if (!tableName) throw new Error('Table name not found.')
      const manyToManyTableName = this._getManyToManyTableName(column)
      for (const id of ids) {
        const query = `INSERT INTO "${manyToManyTableName}" ("${this.schemaName}_id", "${tableName}_id") VALUES (?, ?)`
        this._db.prepare(query).run(recordId, id)
      }
    }
  }

  private _updateManyToManyColumns = async (
    recordId: string,
    manyToManyColumns: { [key: string]: string[] }
  ) => {
    for (const [columnName, ids] of Object.entries(manyToManyColumns)) {
      const column = this.columns.find((f) => f.name === columnName)
      const tableName = column?.table
      if (!tableName) throw new Error('Table name not found.')
      const manyToManyTableName = this._getManyToManyTableName(column)
      const deleteQuery = `DELETE FROM "${manyToManyTableName}" WHERE "${this.schemaName}_id" = ?`
      this._db.prepare(deleteQuery).run(recordId)
      for (const id of ids) {
        const query = `INSERT INTO "${manyToManyTableName}" ("${this.schemaName}_id", "${tableName}_id") VALUES (?, ?)`
        this._db.prepare(query).run(recordId, id)
      }
    }
  }

  private _getExistingColumns = (): ColumnInfo[] => {
    return this._db.prepare(`PRAGMA table_info("${this.schemaName}")`).all() as ColumnInfo[]
  }

  private _convertFormula = (formula: string, values: string) => {
    return formula.replace(/\bCONCAT\b/g, 'GROUP_CONCAT').replace(/\bvalues\b/g, values)
  }

  private _preprocess = (record: {
    [key: string]: RecordFieldValue
  }): {
    [key: string]: string | number | boolean | null
  } => {
    return Object.keys(record).reduce(
      (
        acc: {
          [key: string]: string | number | boolean | null
        },
        key
      ) => {
        const value = record[key]
        const field = this.fields.find((f) => f.name === key)
        if (!field) throw new Error(`Field "${key}" not found`)
        const slugifiedField = this._slugify(field.name)
        if (value === undefined || value === null) {
          acc[slugifiedField] = null
        } else if (field.type === 'DateTime') {
          if (value instanceof Date) acc[key] = value.getTime()
          else acc[slugifiedField] = new Date(String(value)).getTime()
        } else if (field?.type === 'Checkbox') {
          acc[slugifiedField] = value ? 1 : 0
        } else if (field?.type === 'MultipleLinkedRecord') {
          acc[slugifiedField] = JSON.stringify(value)
        } else if (field?.type === 'MultipleSelect') {
          acc[slugifiedField] = JSON.stringify(value)
        } else if (field?.type === 'MultipleAttachment') {
          acc[slugifiedField] = JSON.stringify(value)
        } else {
          acc[slugifiedField] = value as string | number | boolean
        }
        return acc
      },
      {}
    )
  }

  private _postprocess = <T extends RecordFields>(row: Row): PersistedRecordFieldsDto<T> => {
    const { id, created_at, updated_at, ...columnsToProcess } = row
    const fields = Object.keys(columnsToProcess).reduce((acc: RecordFields, key) => {
      const value = row[key]
      const field = this.fields.find((f) => this._slugify(f.name) === key)
      if (!field) throw new Error(`Field "${key}" not found`)
      switch (field.type) {
        case 'DateTime':
          acc[field.name] = value ? new Date(Number(value)) : null
          break
        case 'MultipleLinkedRecord':
          acc[field.name] = value ? String(value).split(',') : []
          break
        case 'MultipleAttachment':
          acc[field.name] = value ? JSON.parse(String(value)) : []
          break
        case 'Checkbox':
          acc[field.name] = value === 1
          break
        case 'MultipleSelect':
          acc[field.name] = value ? JSON.parse(String(value)) : []
          break
        case 'Rollup':
          if (field.output.type === 'Number') {
            acc[field.name] = value ? Number(value) : 0
          } else {
            acc[field.name] = value
          }
          break
        default:
          acc[field.name] = value
      }
      return acc
    }, {}) as T
    return {
      id,
      created_at: new Date(created_at),
      updated_at: updated_at ? new Date(updated_at) : undefined,
      fields,
    }
  }

  private _convertFilterToConditions = (
    filter: FilterDto
  ): { conditions: string; values: (string | number)[] } => {
    const values: (string | number)[] = []
    if ('and' in filter) {
      const conditions = filter.and.map((f) => {
        const { conditions, values: filterValues } = this._convertFilterToConditions(f)
        values.push(...filterValues)
        return `(${conditions})`
      })
      return { conditions: conditions.join(' AND '), values }
    } else if ('or' in filter) {
      const conditions = filter.or.map((f) => {
        const { conditions, values: filterValues } = this._convertFilterToConditions(f)
        values.push(...filterValues)
        return `(${conditions})`
      })
      return { conditions: conditions.join(' OR '), values }
    }
    const { operator } = filter
    const field = this.fields.find((f) => f.name === filter.field)
    if (!field && filter.field !== 'created_time' && filter.field !== 'last_edited_time') {
      throw new Error(`Field "${filter.field}" does not exist`)
    }
    const slugifiedField = this._slugify(filter.field)
    switch (operator) {
      case 'Is':
        return {
          conditions: `"${slugifiedField}" = ?`,
          values: [filter.value],
        }
      case 'Contains':
        return {
          conditions: `"${slugifiedField}" LIKE ?`,
          values: [`%${filter.value}%`],
        }
      case 'Equals':
        return {
          conditions: `"${slugifiedField}" = ?`,
          values: [filter.value],
        }
      case 'IsAnyOf':
        return {
          conditions: `"${slugifiedField}" IN (${filter.value.map(() => '?').join(', ')})`,
          values: filter.value,
        }
      case 'OnOrAfter':
        return {
          conditions: `"${slugifiedField}" >= ?`,
          values: [new Date(filter.value).getTime()],
        }
      case 'IsAfter':
        return {
          conditions: `"${slugifiedField}" > ?`,
          values: [new Date(filter.value).getTime()],
        }
      case 'IsBefore':
        return {
          conditions: `"${slugifiedField}" < ?`,
          values: [new Date(filter.value).getTime()],
        }
      case 'IsFalse':
        return {
          conditions: `"${slugifiedField}" = 0`,
          values: [],
        }
      case 'IsTrue':
        return {
          conditions: `"${slugifiedField}" = 1`,
          values: [],
        }
      default:
        throw new Error(`Unsupported operator: ${operator}`)
    }
  }

  private _getLinkedRecordField = (name: string) => {
    const linkedRecord = this.fields.find((f) => f.name === name)
    if (!linkedRecord || linkedRecord.type !== 'MultipleLinkedRecord')
      throw new Error('Linked record not found')
    return linkedRecord
  }

  private _convertFieldToColumn = (field: IField): Column => {
    const column = {
      name: this._slugify(field.name),
      required: field.required,
      onMigration: field.onMigration,
    }
    let rollupTable: string | undefined
    if (field.type === 'Rollup') {
      rollupTable = this._getLinkedRecordField(field.multipleLinkedRecord).table
    }
    switch (field.type) {
      case 'SingleLineText':
        return {
          ...column,
          type: 'TEXT',
        }
      case 'LongText':
        return {
          ...column,
          type: 'TEXT',
        }
      case 'Email':
        return {
          ...column,
          type: 'TEXT',
        }
      case 'DateTime':
        return {
          ...column,
          type: 'TIMESTAMP',
        }
      case 'Number':
        return {
          ...column,
          type: 'NUMERIC',
        }
      case 'Formula':
        return {
          ...column,
          type: this._convertFieldToColumn({ name: field.name, ...field.output }).type,
          formula: field.formula,
        }
      case 'Checkbox':
        return {
          ...column,
          type: 'BOOLEAN',
        }
      case 'SingleSelect':
        return {
          ...column,
          type: 'TEXT',
          options: field.options,
        }
      case 'MultipleSelect':
        return {
          ...column,
          type: 'TEXT[]',
          options: field.options,
        }
      case 'SingleLinkedRecord':
        return {
          ...column,
          type: 'TEXT',
          table: field.table,
        }
      case 'MultipleLinkedRecord':
        return {
          ...column,
          type: 'TEXT[]',
          table: field.table,
        }
      case 'MultipleAttachment':
        return {
          ...column,
          type: 'TEXT',
        }
      case 'Rollup':
        return {
          ...column,
          type: this._convertFieldToColumn({ name: field.name, ...field.output }).type,
          formula: field.formula,
          table: rollupTable,
          tableField: field.linkedRecordField,
        }
    }
  }

  private _throwError = (error: unknown) => {
    if (error instanceof Error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        throw new Error('Record id already exists')
      }
      if (error.message.includes('FOREIGN KEY constraint failed')) {
        throw new Error('Invalid linked record')
      }
    }
    throw error
  }
}

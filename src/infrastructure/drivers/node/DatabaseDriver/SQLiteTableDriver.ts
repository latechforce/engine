import SQLite from 'better-sqlite3'
import type { IDatabaseTableDriver } from '@adapter/spi/drivers/DatabaseTableSpi'
import type { FilterDto } from '@domain/entities/Filter'
import type { RecordFields, RecordFieldValue } from '@domain/entities/Record'
import type {
  PersistedRecordFieldsDto,
  RecordFieldsToCreateDto,
  RecordFieldsToUpdateDto,
} from '@adapter/spi/dtos/RecordDto'
import type { ITable } from '@domain/interfaces/ITable'
import type { IField } from '@domain/interfaces/IField'

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
  public viewName: string
  public fields: IField[]
  public columns: Column[]

  constructor(
    config: ITable,
    private _db: SQLite.Database
  ) {
    this.name = config.name
    this.viewName = `${config.name}_view`
    const [schema, table] = this.name.includes('.') ? this.name.split('.') : ['public', this.name]
    this.name = schema === 'public' ? table : `${schema}_${table}`
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
      .all(this.name)
    return result.length > 0
  }

  create = async () => {
    const exists = await this.exists()
    if (exists) throw new Error(`Table "${this.name}" already exists`)
    const tableColumns = this._buildColumnsQuery(this.columns)
    const tableQuery = `CREATE TABLE ${this.name} (${tableColumns})`
    this._db.exec(tableQuery)
    await this._createManyToManyTables()
  }

  migrate = async () => {
    const existingColumns = this._getExistingColumns()
    const staticColumns = this.columns.filter((field) => !this._isViewColumn(field))
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
      const query = `ALTER TABLE ${this.name} ADD COLUMN ${column}`
      this._db.exec(query)
      if (reference) {
        this._db.exec(`ALTER TABLE ${this.name} ADD CONSTRAINT fk_${field.name} ${reference}`)
      }
    }
    if (fieldsToAlter.length > 0) {
      const tempTableName = `${this.name}_temp`
      const newSchema = this._buildColumnsQuery(staticColumns)
      this._db.exec(`DROP TABLE IF EXISTS ${tempTableName}`)
      this._db.exec(`CREATE TABLE ${tempTableName} (${newSchema})`)
      for (const field of fieldsToAlter) {
        if (field.onMigration && field.onMigration.replace) {
          const existingColumnWithNewName = existingColumns.find(
            (column) => column.name === field.name
          )
          if (!existingColumnWithNewName) {
            const renameQuery = `ALTER TABLE ${this.name} RENAME COLUMN ${field.onMigration.replace} TO ${field.name}`
            this._db.exec(renameQuery)
          }
        }
      }
      const columnsToCopy = staticColumns.map((field) => field.name).join(', ')
      this._db.exec(`PRAGMA foreign_keys = OFF`)
      this._db.exec(
        `INSERT INTO ${tempTableName} (${columnsToCopy}) SELECT ${columnsToCopy} FROM ${this.name}`
      )
      this._db.exec(`DROP TABLE ${this.name}`)
      this._db.exec(`ALTER TABLE ${tempTableName} RENAME TO ${this.name}`)
      this._db.exec(`PRAGMA foreign_keys = ON`)
    }
    await this._createManyToManyTables()
  }

  viewExists = async () => {
    const result = this._db
      .prepare(`SELECT name FROM sqlite_master WHERE type='view' AND name = ?`)
      .all(this.viewName)
    return result.length > 0
  }

  createView = async () => {
    let joins = ''
    const exists = await this.viewExists()
    if (exists) throw new Error(`View "${this.viewName}" already exists`)
    const columns = this.fields
      .map((field) => {
        const column = this._convertFieldToColumn(field)
        if (field.type === 'Rollup') {
          const linkedRecordField = this._getLinkedRecordField(field.multipleLinkedRecord)
          const values = `${linkedRecordField.table}_view.${field.linkedRecordField}`
          const formula = this._convertFormula(field.formula, values)
          const linkedRecordColumn = this._convertFieldToColumn(linkedRecordField)
          const manyToManyTableName = this._getManyToManyTableName(linkedRecordColumn)
          if (!joins.includes(manyToManyTableName)) {
            joins += ` LEFT JOIN ${manyToManyTableName} ON ${this.name}.id = ${manyToManyTableName}.${this.name}_id`
            joins += ` LEFT JOIN ${linkedRecordField.table}_view ON ${manyToManyTableName}.${linkedRecordField.table}_id = ${linkedRecordField.table}_view.id`
          }
          return `CAST(${formula} AS ${column.type}) AS "${column.name}"`
        } else if (field.type === 'Formula') {
          const expandedFormula = this.columns.reduce((acc, f) => {
            const regex = new RegExp(`\\b${f.name}\\b`, 'g')
            return acc.replace(regex, f.formula ? `(${f.formula})` : `"${f.name}"`)
          }, field.formula)
          return `CAST(${expandedFormula} AS ${column.type}) AS "${column.name}"`
        } else if (field.type === 'MultipleLinkedRecord') {
          return `(SELECT GROUP_CONCAT("${column.table}_id") FROM ${this._getManyToManyTableName(column)} WHERE "${this.name}_id" = ${this.name}.id) AS "${column.name}"`
        } else {
          return `${this.name}.${column.name} AS "${column.name}"`
        }
      })
      .join(', ')
    let query = `CREATE VIEW ${this.viewName} AS SELECT ${columns} FROM ${this.name}`
    if (joins) query += joins + ` GROUP BY ${this.name}.id`
    this._db.exec(query)
  }

  dropView = async () => {
    const query = `DROP VIEW IF EXISTS ${this.viewName}`
    this._db.exec(query)
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
      const query = `DELETE FROM ${this.name} WHERE id = ?`
      this._db.prepare(query).run(values)
    } catch (e) {
      this._throwError(e)
    }
  }

  read = async <T extends RecordFields>(filter: FilterDto) => {
    const { conditions, values } = this._convertFilterToConditions(filter)
    if (!conditions) return
    const query = `SELECT * FROM ${this.viewName} ${conditions.length > 0 ? `WHERE ${conditions}` : ''} LIMIT 1`
    const record = this._db.prepare(query).get(values) as Row | undefined
    return record ? this._postprocess<T>(record) : undefined
  }

  readById = async <T extends RecordFields>(id: string) => {
    const query = `SELECT * FROM ${this.viewName} WHERE id = ?`
    const record = this._db.prepare(query).get([id]) as Row | undefined
    return record ? this._postprocess<T>(record) : undefined
  }

  list = async <T extends RecordFields>(filter?: FilterDto) => {
    const { conditions, values } = filter
      ? this._convertFilterToConditions(filter)
      : { conditions: '', values: [] }
    if (!conditions) {
      const query = `SELECT * FROM ${this.viewName}`
      const records = this._db.prepare(query).all() as Row[]
      return records.map(this._postprocess<T>)
    }
    const query = `SELECT * FROM ${this.viewName} WHERE ${conditions}`
    const records = this._db.prepare(query).all(values) as Row[]
    return records.map(this._postprocess<T>)
  }

  private _insert = async <T extends RecordFields>(record: RecordFieldsToCreateDto<T>) => {
    const { id, created_at, fields } = record
    const { staticColumns, manyToManyColumns } = this._splitColumns({ id, created_at, ...fields })
    const preprocessedFields = this._preprocess(staticColumns)
    const keys = Object.keys(preprocessedFields)
    const values = Object.values(preprocessedFields)
    const placeholders = keys.map(() => `?`).join(', ')
    const query = `INSERT INTO ${this.name} (${keys.join(', ')}) VALUES (${placeholders})`
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
    const query = `UPDATE ${this.name} SET ${setString} WHERE id = ?`
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

  private _slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '_')
      .replace(/-+/g, '_')
  }

  private _getManyToManyTableName = (column: Column) => {
    return [this.name, column.table].sort().join('_') + '_' + this._slugify(column.name)
  }

  private _createManyToManyTables = async () => {
    for (const column of this.columns) {
      if (column.type === 'TEXT[]' && column.table) {
        const manyToManyTableName = this._getManyToManyTableName(column)
        const query = `
          CREATE TABLE IF NOT EXISTS ${manyToManyTableName} (
            "${this.name}_id" TEXT NOT NULL,
            "${column.table}_id" TEXT NOT NULL,
            FOREIGN KEY ("${this.name}_id") REFERENCES ${this.name}(id),
            FOREIGN KEY ("${column.table}_id") REFERENCES ${column.table}(id)
          )
        `
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
      const field = this.columns.find((f) => f.name === key)
      if (field?.type === 'TEXT[]' && field.table && Array.isArray(value)) {
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
        const query = `INSERT INTO ${manyToManyTableName} ("${this.name}_id", "${tableName}_id") VALUES (?, ?)`
        this._db.prepare(query).run([recordId, id])
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
      const deleteQuery = `DELETE FROM ${manyToManyTableName} WHERE "${this.name}_id" = ?`
      this._db.prepare(deleteQuery).run([recordId])
      for (const id of ids) {
        const query = `INSERT INTO ${manyToManyTableName} ("${this.name}_id", "${tableName}_id") VALUES (?, ?)`
        this._db.prepare(query).run([recordId, id])
      }
    }
  }

  private _getExistingColumns = (): ColumnInfo[] => {
    return this._db.prepare(`PRAGMA table_info(${this.name})`).all() as ColumnInfo[]
  }

  private _convertFormula = (formula: string, values: string) => {
    return formula.replace(/\bCONCAT\b/g, 'GROUP_CONCAT').replace(/\bvalues\b/g, values)
  }

  private _preprocess = (record: { [key: string]: RecordFieldValue }) => {
    return Object.keys(record).reduce(
      (
        acc: {
          [key: string]: RecordFieldValue
        },
        key
      ) => {
        const value = record[key]
        const field = this.columns.find((f) => f.name === key)
        if (value === undefined || value === null) {
          acc[key] = null
        } else if (field?.type === 'TIMESTAMP') {
          if (value instanceof Date) acc[key] = value.getTime()
          else acc[key] = new Date(String(value)).getTime()
        } else if (field?.type === 'BOOLEAN') {
          acc[key] = value ? 1 : 0
        } else {
          acc[key] = value
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
      const field = this.fields.find((f) => f.name === key)
      if (!field) throw new Error(`Field "${key}" not found`)
      switch (field.type) {
        case 'DateTime':
          acc[key] = new Date(Number(value))
          break
        case 'MultipleLinkedRecord':
          acc[key] = value ? String(value).split(',') : []
          break
        case 'Checkbox':
          acc[key] = value === 1
          break
        case 'Rollup':
          if (field.output.type === 'Number') {
            acc[key] = value ? Number(value) : 0
          } else {
            acc[key] = value
          }
          break
        default:
          acc[key] = value
      }
      return acc
    }, columnsToProcess) as T
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
    switch (operator) {
      case 'Is':
        return {
          conditions: `"${filter.field}" = ?`,
          values: [filter.value],
        }
      case 'Contains':
        return {
          conditions: `"${filter.field}" LIKE ?`,
          values: [`%${filter.value}%`],
        }
      case 'Equals':
        return {
          conditions: `"${filter.field}" = ?`,
          values: [filter.value],
        }
      case 'IsAnyOf':
        return {
          conditions: `"${filter.field}" IN (${filter.value.map(() => '?').join(', ')})`,
          values: filter.value,
        }
      case 'OnOrAfter':
        return {
          conditions: `"${filter.field}" >= datetime(?)`,
          values: [filter.value],
        }
      case 'IsFalse':
        return {
          conditions: `"${filter.field}" = 0`,
          values: [],
        }
      case 'IsTrue':
        return {
          conditions: `"${filter.field}" = 1`,
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
      name: field.name,
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

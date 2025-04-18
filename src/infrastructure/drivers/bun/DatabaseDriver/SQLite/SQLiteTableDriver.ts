import { Database } from 'bun:sqlite'
import type { FilterDto } from '/domain/entities/Filter'
import type { RecordFields, RecordFieldValue } from '/domain/entities/Record'
import type {
  PersistedRecordFieldsDto,
  RecordFieldsToCreateDto,
  RecordFieldsToUpdateDto,
} from '/adapter/spi/dtos/RecordDto'
import slugify from 'slugify'
import type { ColumnInfo, Row } from './SQLiteTypes'
import type { Column } from './SQLiteTypes'
import type { IDatabaseTableDriver } from '/adapter/spi/drivers/DatabaseTableSpi'
import type { FieldConfig } from '/domain/entities/Field'
import type { TableConfig } from '/domain/entities/Table'

export class SQLiteDatabaseTableDriver implements IDatabaseTableDriver {
  public name: string
  public schema: string
  public nameWithSchema: string
  public view: string
  public viewWithSchema: string
  public fields: FieldConfig[]
  public columns: Column[]

  constructor(
    config: TableConfig,
    private _db: Database
  ) {
    this.name = config.name
    this.schema = config.schema ?? 'public'
    this.nameWithSchema = `${this.schema}_${this.name}`
    this.view = `${this.name}_view`
    this.viewWithSchema = `${this.schema}_${this.view}`
    this.fields = [
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
      ...config.fields,
    ]
    this.columns = this.fields.map(this._convertFieldToColumn)
  }

  getSchema = async (): Promise<string> => {
    return this.schema
  }

  getColumns = async (): Promise<Column[]> => {
    const columns = this._db
      .query<
        {
          name: string
          type: 'TEXT' | 'TIMESTAMP' | 'NUMERIC' | 'BOOLEAN' | 'TEXT[]'
          notnull: number
        },
        []
      >(`PRAGMA table_info(${this.nameWithSchema})`)
      .all()
    if (!columns) throw new Error(`Table "${this.name}" not found`)
    return columns.map((column) => ({
      name: column.name,
      type: column.type,
      required: column.notnull === 1,
    }))
  }

  ensureSync = (): void => {
    const exists = this.existsSync()
    if (!exists) {
      this.createSync()
      this.createViewSync()
    }
  }

  ensure = async (): Promise<void> => {
    return this.ensureSync()
  }

  existsSync = (): boolean => {
    const result = this._db
      .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name = ?`)
      .all(this.nameWithSchema)
    return result.length > 0
  }

  exists = async (): Promise<boolean> => {
    return this.existsSync()
  }

  createSync = () => {
    try {
      this._db.exec('BEGIN TRANSACTION')
      const exists = this.existsSync()
      if (exists) throw new Error(`Table "${this.name}" already exists`)
      const tableColumns = this._buildColumnsQuery(this.columns)
      const tableQuery = `CREATE TABLE ${this.nameWithSchema} (${tableColumns})`
      this._db.exec(tableQuery)
      this._createManyToManyTables()
      this._db.exec('COMMIT')
    } catch (e) {
      this._db.exec('ROLLBACK')
      this._throwError(e)
    }
  }

  create = async (): Promise<void> => {
    return this.createSync()
  }

  migrateSync = () => {
    try {
      this._db.exec('BEGIN TRANSACTION')
      const existingColumns = this._getExistingColumns()
      const staticColumns = this.columns.filter((column) => !this._isViewColumn(column))
      const fieldsToAdd = staticColumns.filter(
        (field) => !existingColumns.some((column) => column.name === field.name)
      )
      const fieldsToAlter = staticColumns.filter((field) => {
        const existingColumn = existingColumns.find((column) => column.name === field.name)
        if (!existingColumn) return false
        return (
          existingColumn.type !== field.type || existingColumn.required !== (field.required ? 1 : 0)
        )
      })
      for (const field of fieldsToAdd) {
        const [column, reference] = this._buildColumnsQuery([field]).split(',')
        const query = `ALTER TABLE "${this.nameWithSchema}" ADD COLUMN ${column}`
        this._db.exec(query)
        if (reference) {
          this._db.exec(
            `ALTER TABLE ${this.nameWithSchema} ADD CONSTRAINT fk_${field.name} ${reference}`
          )
        }
      }
      if (fieldsToAlter.length > 0) {
        const tempTableName = `${this.nameWithSchema}_temp`
        const newSchema = this._buildColumnsQuery(staticColumns)
        this._db.exec(`DROP TABLE IF EXISTS ${tempTableName}`)
        this._db.exec(`CREATE TABLE ${tempTableName} (${newSchema})`)
        const columnsToCopy = staticColumns.map((field) => field.name).join(', ')
        this._db.exec(`PRAGMA defer_foreign_keys = ON`)
        this._db.exec(
          `INSERT INTO ${tempTableName} (${columnsToCopy}) SELECT ${columnsToCopy} FROM ${this.nameWithSchema}`
        )
        this._db.exec(`DROP TABLE ${this.nameWithSchema}`)
        this._db.exec(`ALTER TABLE ${tempTableName} RENAME TO ${this.nameWithSchema}`)
        this._db.exec(`PRAGMA defer_foreign_keys = OFF`)
      }
      this._createManyToManyTables()
      this._db.exec('COMMIT')
    } catch (e) {
      console.log(e)
      this._db.exec('ROLLBACK')
      this._throwError(e)
    }
  }

  migrate = async (): Promise<void> => {
    return this.migrateSync()
  }

  createViewSync = () => {
    try {
      this._db.exec('BEGIN TRANSACTION')
      this._db.exec(`DROP VIEW IF EXISTS ${this.viewWithSchema}`)
      let joins = ''
      const columns = this.fields
        .map((field) => {
          const column = this._convertFieldToColumn(field)
          if (field.type === 'Rollup') {
            const linkedRecordField = field.multipleLinkedRecord
            const values = `"${this.schema}_${linkedRecordField.table}_view".${field.linkedRecordField}`
            const formula = this._convertFormula(field.formula, values)
            const linkedRecordColumn = this._convertFieldToColumn(linkedRecordField)
            const manyToManyTableName = this._getManyToManyTableName(linkedRecordColumn)
            if (!joins.includes(manyToManyTableName)) {
              joins += ` LEFT JOIN "${manyToManyTableName}" ON "${this.name}".id = "${manyToManyTableName}"."${this.name}_id"`
              joins += ` LEFT JOIN "${this.schema}_${linkedRecordField.table}_view" ON "${manyToManyTableName}"."${linkedRecordField.table}_id" = "${this.schema}_${linkedRecordField.table}_view".id`
            }
            return `CAST(${formula} AS ${column.type}) AS "${column.name}"`
          } else if (field.type === 'Formula') {
            const expandedFormula = this.columns.reduce((acc, f) => {
              const regex = new RegExp(`\\b${f.name}\\b`, 'g')
              return acc.replace(regex, f.formula ? `(${f.formula})` : `"${f.name}"`)
            }, field.formula)
            return `CAST(${expandedFormula} AS ${column.type}) AS "${column.name}"`
          } else if (field.type === 'MultipleLinkedRecord') {
            return `(SELECT GROUP_CONCAT("${column.table}_id") FROM ${this._getManyToManyTableName(column)} WHERE "${this.name}_id" = "${this.name}".id) AS "${column.name}"`
          } else {
            return `"${this.name}".${column.name} AS "${column.name}"`
          }
        })
        .join(', ')
      let query = `CREATE VIEW ${this.viewWithSchema} AS SELECT ${columns} FROM ${this.nameWithSchema} AS "${this.name}"`
      if (joins) query += joins + ` GROUP BY "${this.name}".id`
      this._db.exec(query)
      this._db.exec('COMMIT')
    } catch (e) {
      this._db.exec('ROLLBACK')
      this._throwError(e)
    }
  }

  createView = async (): Promise<void> => {
    return this.createViewSync()
  }

  dropViewSync = () => {
    this._db.exec(`DROP VIEW IF EXISTS "${this.viewWithSchema}"`)
  }

  dropView = async (): Promise<void> => {
    return this.dropViewSync()
  }

  insertSync = <T extends RecordFields>(record: RecordFieldsToCreateDto<T>) => {
    try {
      this._db.exec('BEGIN TRANSACTION')
      this._insert<T>(record)
      this._db.exec('COMMIT')
    } catch (e) {
      this._db.exec('ROLLBACK')
      this._throwError(e)
    }
  }

  insert = async <T extends RecordFields>(record: RecordFieldsToCreateDto<T>): Promise<void> => {
    return this.insertSync(record)
  }

  insertManySync = <T extends RecordFields>(records: RecordFieldsToCreateDto<T>[]) => {
    try {
      this._db.exec('BEGIN TRANSACTION')
      for (const record of records) this._insert<T>(record)
      this._db.exec('COMMIT')
    } catch (e) {
      this._db.exec('ROLLBACK')
      this._throwError(e)
    }
  }

  insertMany = async <T extends RecordFields>(
    records: RecordFieldsToCreateDto<T>[]
  ): Promise<void> => {
    return this.insertManySync(records)
  }

  updateSync = <T extends RecordFields>(record: RecordFieldsToUpdateDto<T>) => {
    try {
      this._db.exec('BEGIN TRANSACTION')
      this._update<T>(record)
      this._db.exec('COMMIT')
    } catch (e) {
      this._db.exec('ROLLBACK')
      this._throwError(e)
    }
  }

  update = async <T extends RecordFields>(record: RecordFieldsToUpdateDto<T>): Promise<void> => {
    return this.updateSync(record)
  }

  updateManySync = <T extends RecordFields>(records: RecordFieldsToUpdateDto<T>[]) => {
    try {
      this._db.exec('BEGIN TRANSACTION')
      for (const record of records) this._update<T>(record)
      this._db.exec('COMMIT')
    } catch (e) {
      this._db.exec('ROLLBACK')
      this._throwError(e)
    }
  }

  updateMany = async <T extends RecordFields>(
    records: RecordFieldsToUpdateDto<T>[]
  ): Promise<void> => {
    return this.updateManySync(records)
  }

  deleteSync = (id: string) => {
    try {
      const values = [id]
      const query = `DELETE FROM ${this.nameWithSchema} WHERE id = ?`
      this._db.prepare(query).run(...values)
    } catch (e) {
      this._throwError(e)
    }
  }

  delete = async (id: string): Promise<void> => {
    return this.deleteSync(id)
  }

  readSync = <T extends RecordFields>(filter: FilterDto) => {
    const { conditions, values } = this._convertFilterToConditions(filter)
    if (!conditions) return
    const query = `SELECT * FROM ${this.viewWithSchema} ${conditions.length > 0 ? `WHERE ${conditions}` : ''} LIMIT 1`
    const record = this._db.prepare(query).get(...values) as Row | undefined
    return record ? this._postprocess<T>(record) : undefined
  }

  read = async <T extends RecordFields>(
    filter: FilterDto
  ): Promise<PersistedRecordFieldsDto<T> | undefined> => {
    return this.readSync(filter)
  }

  readByIdSync = <T extends RecordFields>(id: string) => {
    const query = `SELECT * FROM ${this.viewWithSchema} WHERE id = ?`
    const record = this._db.prepare(query).get(id) as Row | undefined
    return record ? this._postprocess<T>(record) : undefined
  }

  readById = async <T extends RecordFields>(
    id: string
  ): Promise<PersistedRecordFieldsDto<T> | undefined> => {
    return this.readByIdSync(id)
  }

  listSync = <T extends RecordFields>(filter?: FilterDto) => {
    const { conditions, values } = filter
      ? this._convertFilterToConditions(filter)
      : { conditions: '', values: [] }
    if (!conditions) {
      const query = `SELECT * FROM ${this.viewWithSchema}`
      const records = this._db.prepare(query).all() as Row[]
      return records.map(this._postprocess<T>)
    }
    const query = `SELECT * FROM ${this.viewWithSchema} WHERE ${conditions}`
    const records = this._db.prepare(query).all(...values) as Row[]
    return records.map(this._postprocess<T>)
  }

  list = async <T extends RecordFields>(
    filter?: FilterDto
  ): Promise<PersistedRecordFieldsDto<T>[]> => {
    return this.listSync(filter)
  }

  private _insert = <T extends RecordFields>(record: RecordFieldsToCreateDto<T>) => {
    const { id, created_at, fields } = record
    const { staticColumns, manyToManyColumns } = this._splitColumns({ id, created_at, ...fields })
    const preprocessedFields = this._preprocess(staticColumns)
    const keys = Object.keys(preprocessedFields)
    const values = Object.values(preprocessedFields)
    const placeholders = keys.map(() => `?`).join(', ')
    const query = `INSERT INTO ${this.nameWithSchema} (${keys.join(', ')}) VALUES (${placeholders})`
    this._db.prepare(query).run(...values)
    if (Object.keys(manyToManyColumns).length > 0) {
      this._insertManyToManyColumns(record.id, manyToManyColumns)
    }
  }

  private _update = <T extends RecordFields>(record: RecordFieldsToUpdateDto<T>) => {
    const { id, updated_at, fields } = record
    const { staticColumns, manyToManyColumns } = this._splitColumns({ id, updated_at, ...fields })
    const preprocessedFields = this._preprocess(staticColumns)
    const keys = Object.keys(preprocessedFields)
    const values = Object.values(preprocessedFields)
    const setString = keys.map((key) => `${key} = ?`).join(', ')
    const query = `UPDATE ${this.nameWithSchema} SET ${setString} WHERE id = ?`
    this._db.prepare(query).run(...values, record.id)
    if (Object.keys(manyToManyColumns).length > 0) {
      this._updateManyToManyColumns(record.id, manyToManyColumns)
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
        references.push(
          `FOREIGN KEY ("${column.name}") REFERENCES ${this.schema}_${column.table}(id)`
        )
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
    return [this.nameWithSchema, column.table].sort().join('_') + '_' + this._slugify(column.name)
  }

  private _createManyToManyTables = () => {
    for (const column of this.columns) {
      if (column.type === 'TEXT[]' && column.table) {
        const manyToManyTableName = this._getManyToManyTableName(column)
        const query = `
          CREATE TABLE IF NOT EXISTS ${manyToManyTableName} (
            "${this.name}_id" TEXT NOT NULL,
            "${column.table}_id" TEXT NOT NULL,
            FOREIGN KEY ("${this.name}_id") REFERENCES ${this.schema}_${this.name}(id),
            FOREIGN KEY ("${column.table}_id") REFERENCES ${this.schema}_${column.table}(id)
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
      if (
        column?.type === 'TEXT[]' &&
        column.table &&
        Array.isArray(value) &&
        value.every((v) => typeof v === 'string')
      ) {
        manyToManyColumns[key] = value
      } else {
        staticColumns[key] = value
      }
    }
    return { staticColumns, manyToManyColumns }
  }

  private _insertManyToManyColumns = (
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
        this._db.prepare(query).run(recordId, id)
      }
    }
  }

  private _updateManyToManyColumns = (
    recordId: string,
    manyToManyColumns: { [key: string]: string[] }
  ) => {
    for (const [columnName, ids] of Object.entries(manyToManyColumns)) {
      const column = this.columns.find((f) => f.name === columnName)
      const tableName = column?.table
      if (!tableName) throw new Error('Table name not found.')
      const manyToManyTableName = this._getManyToManyTableName(column)
      const deleteQuery = `DELETE FROM ${manyToManyTableName} WHERE "${this.name}_id" = ?`
      this._db.prepare(deleteQuery).run(recordId)
      for (const id of ids) {
        const query = `INSERT INTO ${manyToManyTableName} ("${this.name}_id", "${tableName}_id") VALUES (?, ?)`
        this._db.prepare(query).run(recordId, id)
      }
    }
  }

  private _getExistingColumns = (): ColumnInfo[] => {
    return this._db.prepare(`PRAGMA table_info("${this.nameWithSchema}")`).all() as ColumnInfo[]
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
        if (value === undefined || value === null || value === '') {
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
        } else if (field?.type === 'SingleAttachment') {
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
        case 'SingleAttachment':
          acc[field.name] = value ? JSON.parse(String(value)) : null
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
      created_at: new Date(created_at).toISOString(),
      updated_at: updated_at ? new Date(updated_at).toISOString() : undefined,
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

  private _convertFieldToColumn = (field: FieldConfig): Column => {
    const column = {
      name: this._slugify(field.name),
      required: field.required,
    }
    let rollupTable: string | undefined
    if (field.type === 'Rollup') {
      rollupTable = field.multipleLinkedRecord.table
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
      case 'Url':
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
          type: this._convertFieldToColumn({ ...field.output, name: field.name }).type,
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
      case 'SingleAttachment':
        return {
          ...column,
          type: 'TEXT',
        }
      case 'Rollup':
        return {
          ...column,
          type: this._convertFieldToColumn({ ...field.output, name: field.name }).type,
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
      if (error.message.includes('NOT NULL constraint failed')) {
        let field: string
        if (error.message.includes('"')) {
          field = error.message.split('"')[1]
        } else {
          field = error.message.split('.')[1]
        }
        throw new Error(`Field "${field}" is required`)
      }
    }
    throw error
  }
}

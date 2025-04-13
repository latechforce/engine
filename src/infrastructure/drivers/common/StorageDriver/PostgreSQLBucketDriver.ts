import type { StorageConfig } from '/domain/services/Storage'
import type { IStorageBucketDriver } from '/adapter/spi/drivers/StorageBucketSpi'
import type { FileDto } from '/adapter/spi/dtos/FileDto'

export class PostgreSQLStorageBucketDriver implements IStorageBucketDriver {
  private _nameWithSchema: string

  constructor(
    private _name: string,
    private _query: StorageConfig['query'],
    private _exec: StorageConfig['exec']
  ) {
    this._nameWithSchema = `storage.${_name}`
  }

  exists = async () => {
    const result = await this._query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'storage' AND table_name = $1`,
      [this._name]
    )
    return result.rows.length > 0
  }

  create = async (): Promise<void> => {
    const createSchemaQuery = `
      CREATE SCHEMA IF NOT EXISTS storage;
    `
    await this._exec(createSchemaQuery)
    const createTableQuery = `
      CREATE TABLE ${this._nameWithSchema} (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        data BYTEA NOT NULL,
        created_at TIMESTAMP NOT NULL
      )
    `
    await this._exec(createTableQuery)
  }

  save = async (fields: FileDto) => {
    const { id, name, data, mime_type, created_at } = fields
    await this._query(
      `INSERT INTO ${this._nameWithSchema} (id, name, mime_type, data, created_at) VALUES ($1, $2, $3, $4, $5)`,
      [id, name, mime_type, data, created_at]
    )
  }

  readById = async (id: string) => {
    const result = await this._query<FileDto>(
      `SELECT * FROM ${this._nameWithSchema} WHERE id = $1`,
      [id]
    )
    const file = result.rows[0]
    if (!file) return
    const created_at = new Date(file.created_at)
    const data = file.data instanceof Buffer ? file.data : Buffer.from(file.data)
    return { ...file, created_at, data }
  }
}

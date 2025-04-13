import type { StorageConfig } from '/domain/services/Storage'
import type { IStorageBucketDriver } from '/adapter/spi/drivers/StorageBucketSpi'
import type { FileDto } from '/adapter/spi/dtos/FileDto'

export class SQLiteStorageBucketDriver implements IStorageBucketDriver {
  private _nameWithSchema: string

  constructor(
    name: string,
    private _query: StorageConfig['query'],
    private _exec: StorageConfig['exec']
  ) {
    this._nameWithSchema = `_storage_${name}`
  }

  exists = async () => {
    const result = await this._query(
      `SELECT name FROM sqlite_master WHERE type='table' AND name = ?`,
      [this._nameWithSchema]
    )
    return result.rows.length > 0
  }

  create = async (): Promise<void> => {
    const createTableQuery = `
      CREATE TABLE ${this._nameWithSchema} (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        data BLOB NOT NULL,
        created_at TIMESTAMP NOT NULL
      )
    `
    await this._exec(createTableQuery)
  }

  save = async (file: FileDto) => {
    const { id, name, mime_type, data, created_at } = file
    const createAt = created_at.getTime()
    await this._query(
      `INSERT INTO ${this._nameWithSchema} (id, name, mime_type, data, created_at) VALUES (?, ?, ?, ?, ?)`,
      [id, name, mime_type, data, createAt]
    )
  }

  readById = async (id: string) => {
    const result = await this._query<FileDto>(
      `SELECT * FROM ${this._nameWithSchema} WHERE id = ?`,
      [id]
    )
    const file = result.rows[0]
    if (!file) return
    const created_at = new Date(file.created_at)
    const data = file.data instanceof Buffer ? file.data : Buffer.from(file.data)
    return { ...file, created_at, data }
  }
}

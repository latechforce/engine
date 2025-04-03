import { PostgreSQLDriver } from '../../common/StorageDriver/PostgreSQLDriver'
import { SQLiteStorageDriver } from './SQLiteDriver'
import type { StorageConfig } from '/domain/services/Storage'
import type { IStorageDriver } from '/adapter/spi/drivers/StorageSpi'

export class StorageDriver implements IStorageDriver {
  private _storage: PostgreSQLDriver | SQLiteStorageDriver

  constructor({ driver, query, exec }: StorageConfig) {
    switch (driver) {
      case 'PostgreSQL':
        this._storage = new PostgreSQLDriver(query, exec)
        break
      case 'SQLite':
        this._storage = new SQLiteStorageDriver(query, exec)
        break
      default:
        throw new Error('Invalid driver')
    }
  }

  connect = async () => {
    await this._storage.connect()
  }

  disconnect = async () => {
    await this._storage.disconnect()
  }

  bucket = (name: string) => {
    return this._storage.bucket(name)
  }
}

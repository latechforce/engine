import type { StorageConfig } from '/domain/services/Storage'
import type { IStorageDriver } from '/adapter/spi/drivers/StorageSpi'
import { SQLiteStorageBucketDriver } from './SQLiteBucketDriver'

export class SQLiteStorageDriver implements IStorageDriver {
  constructor(
    private _query: StorageConfig['query'],
    private _exec: StorageConfig['exec']
  ) {}

  connect = async () => {}

  disconnect: () => Promise<void> = async () => {}

  bucket = (name: string) => {
    return new SQLiteStorageBucketDriver(name, this._query, this._exec)
  }
}

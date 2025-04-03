import type { StorageConfig } from '/domain/services/Storage'
import type { IStorageDriver } from '/adapter/spi/drivers/StorageSpi'
import { PostgreSQLStorageBucketDriver } from './PostgreSQLBucketDriver'

export class PostgreSQLDriver implements IStorageDriver {
  constructor(
    private _query: StorageConfig['query'],
    private _exec: StorageConfig['exec']
  ) {}

  connect = async () => {
    await this._exec('CREATE SCHEMA IF NOT EXISTS storage;')
  }

  disconnect: () => Promise<void> = async () => {}

  bucket = (name: string) => {
    return new PostgreSQLStorageBucketDriver(name, this._query, this._exec)
  }
}

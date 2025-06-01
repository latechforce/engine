import type { Object } from '../entity/object.entity'

export interface IObjectRepository {
  exists(bucketId: number, key: string): Promise<boolean>
  create(object: Object): Promise<void>
  update(object: Object): Promise<void>
  get(bucketId: number, key: string): Promise<Object | null>
  listByBucketId(bucketId: number): Promise<Object[]>
  delete(bucketId: number, key: string): Promise<void>
}

import type { BucketSchema } from '../schema/bucket.schema'

export class Bucket {
  constructor(public readonly schema: BucketSchema) {}
}

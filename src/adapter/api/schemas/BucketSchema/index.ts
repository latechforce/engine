import type { BucketConfig } from '/domain/entities/Bucket'

/**
 * Bucket configuration interface
 * @title Bucket
 * @description Defines a storage bucket for file management
 */
export interface BucketSchema {
  /**
   * Bucket name
   * @title Name
   * @description The name of the bucket.
   */
  name: BucketConfig['name']
}

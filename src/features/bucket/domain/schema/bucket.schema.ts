import { z } from 'zod/v4'
import pkg from 'package.json'

export const bucketSchema = z
  .object({
    id: z.number().int().nonnegative(),
    name: z.string(),
  })
  .meta({
    title: 'Bucket',
    version: pkg.version,
  })

export type BucketSchema = z.infer<typeof bucketSchema>

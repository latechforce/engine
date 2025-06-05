import { z } from 'zod/v4'

export const bucketSchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string(),
})

export type BucketSchema = z.infer<typeof bucketSchema>

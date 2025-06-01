import { z } from 'zod/v4'

export const bucketSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export type BucketSchema = z.infer<typeof bucketSchema>

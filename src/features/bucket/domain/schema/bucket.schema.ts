import { z } from 'zod/v4'
import pkg from '../../../../../package.json'

export const bucketSchema = z
  .object({
    id: z
      .number()
      .int()
      .nonnegative()
      .describe('Unique identifier for the storage bucket')
      .meta({
        title: 'Bucket ID',
        readOnly: true,
        examples: [0, 1, 2, 100],
      }),
    name: z
      .string()
      .trim()
      .min(3)
      .max(63)
      .describe('Name of the storage bucket for organizing files')
      .meta({
        title: 'Bucket Name',
        placeholder: 'my-bucket-name',
        examples: ['user-uploads', 'product-images', 'documents', 'media-assets'],
        pattern: '^[a-z0-9][a-z0-9-]*[a-z0-9]$',
        help: 'Use lowercase letters, numbers, and hyphens. Must start and end with a letter or number.',
      }),
  })
  .strict()
  .meta({
    title: 'Storage Bucket',
    description: 'A storage container for organizing and managing files and media assets',
    version: pkg.version,
  })

export type BucketSchema = z.infer<typeof bucketSchema>

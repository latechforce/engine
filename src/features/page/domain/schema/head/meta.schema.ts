// Third-party imports
import { z } from 'zod/v4'

export const metaHeadElementSchema = z
  .object({
    type: z
      .literal('meta')
      .describe('Type of head element')
      .meta({
        title: 'Head Element Type',
        examples: ['meta'],
      }),
    name: z
      .string()
      .trim()
      .min(1)
      .describe('Name attribute of the meta tag')
      .meta({
        title: 'Meta Name',
        placeholder: 'description',
        examples: ['title', 'description', 'keywords', 'author'],
        help: 'The meta tag name attribute',
      }),
    content: z
      .string()
      .trim()
      .min(1)
      .describe('Content of the meta tag')
      .meta({
        title: 'Meta Content',
        placeholder: 'Enter meta content',
        examples: ['Page description', 'Page title', 'keyword1, keyword2'],
        help: 'The content for this meta tag',
      }),
  })
  .strict()
  .meta({
    title: 'Head Element',
    description: 'Meta element configuration for page head section',
  })

export type MetaHeadElementSchema = z.infer<typeof metaHeadElementSchema>

// Third-party imports
import { z } from 'zod/v4'

export const titleElementSchema = z
  .object({
    type: z
      .literal('title')
      .describe('Type of head element')
      .meta({
        title: 'Head Element Type',
        examples: ['title'],
      }),
    content: z
      .string()
      .trim()
      .min(1)
      .describe('Title content for the page')
      .meta({
        title: 'Page Title',
        placeholder: 'Enter page title',
        examples: ['Custom HTML page', 'About Us', 'Contact', 'Home'],
        help: 'The title that appears in the browser tab and search results',
      }),
  })
  .strict()
  .meta({
    title: 'Title Element',
    description: 'Title element configuration for page head section',
  })

export type TitleElementSchema = z.infer<typeof titleElementSchema>

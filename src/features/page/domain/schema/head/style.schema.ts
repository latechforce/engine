// Third-party imports
import { z } from 'zod/v4'

export const styleElementSchema = z
  .object({
    tag: z
      .literal('style')
      .describe('Type of head element')
      .meta({
        title: 'Head Element Tag',
        examples: ['style'],
      }),
    content: z
      .string()
      .min(1)
      .describe('CSS content for the style tag')
      .meta({
        title: 'CSS Content',
        placeholder: 'body { margin: 0; }',
        examples: [
          '@theme { --color-clifford: #da373d; }',
          'body { font-family: Arial, sans-serif; }',
          '.container { max-width: 1200px; margin: 0 auto; }',
        ],
        help: 'CSS styles to be applied to the page',
        uiSchema: { 'ui:widget': 'textarea', 'ui:rows': 5 },
      }),
    type: z
      .string()
      .optional()
      .describe('Style type attribute')
      .meta({
        title: 'Style Type',
        placeholder: 'text/css',
        examples: ['text/css', 'text/tailwindcss'],
        help: 'MIME type of the stylesheet',
      }),
    media: z
      .string()
      .optional()
      .describe('Media query for when to apply styles')
      .meta({
        title: 'Media Query',
        placeholder: 'screen and (max-width: 768px)',
        examples: ['screen', 'print', 'screen and (max-width: 768px)'],
        help: 'Specify which media/device the styles are for',
      }),
  })
  .strict()
  .meta({
    title: 'Style Element',
    description: 'Style element configuration for page head section',
  })

export type StyleElementSchema = z.infer<typeof styleElementSchema>

// Third-party imports
import { z } from 'zod/v4'

export const linkElementSchema = z
  .object({
    tag: z
      .literal('link')
      .describe('Type of head element')
      .meta({
        title: 'Head Element Tag',
        examples: ['link'],
      }),
    href: z
      .string()
      .min(1)
      .describe('URL of the linked resource')
      .meta({
        title: 'Link URL',
        placeholder: '/styles.css',
        examples: [
          '/index.css',
          'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700',
          '/favicon.ico',
        ],
        help: 'URL of the resource to link to',
      }),
    rel: z
      .string()
      .min(1)
      .describe('Relationship between current document and linked resource')
      .meta({
        title: 'Relationship',
        placeholder: 'stylesheet',
        examples: ['stylesheet', 'icon', 'preconnect', 'canonical', 'alternate'],
        help: 'Specifies the relationship between the current document and the linked document',
      }),
    type: z
      .string()
      .optional()
      .describe('MIME type of the linked resource')
      .meta({
        title: 'MIME Type',
        placeholder: 'text/css',
        examples: ['text/css', 'image/x-icon', 'application/rss+xml'],
        help: 'MIME type of the linked resource',
      }),
    media: z
      .string()
      .optional()
      .describe('Media query for when to load the resource')
      .meta({
        title: 'Media Query',
        placeholder: 'screen and (max-width: 768px)',
        examples: ['screen', 'print', 'screen and (max-width: 768px)'],
        help: 'Specify which media/device the resource is for',
      }),
    sizes: z
      .string()
      .optional()
      .describe('Sizes of the linked resource (for icons)')
      .meta({
        title: 'Sizes',
        placeholder: '16x16',
        examples: ['16x16', '32x32', '180x180', 'any'],
        help: 'Sizes of the icon (for rel="icon" links)',
      }),
    crossorigin: z
      .enum(['anonymous', 'use-credentials'])
      .optional()
      .describe('CORS settings for the resource')
      .meta({
        title: 'CORS Setting',
        help: 'How the element handles cross-origin requests',
      }),
  })
  .strict()
  .meta({
    title: 'Link Element',
    description: 'Link element configuration for page head section',
  })

export type LinkElementSchema = z.infer<typeof linkElementSchema>

// Third-party imports
import { z } from 'zod/v4'
import pkg from '../../../../../package.json'

// Page domain imports
import { headElementSchema } from './head'
import { bodyElementSchema } from './body'

export const pageSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1)
      .describe('Internal name for the page')
      .meta({
        title: 'Page Name',
        placeholder: 'Enter page name',
        examples: ['home', 'about', 'contact', 'custom-html'],
        help: 'Unique identifier for the page',
      }),
    path: z
      .string()
      .trim()
      .min(1)
      .describe('URL path where the page is accessible')
      .meta({
        title: 'Page Path',
        placeholder: '/about',
        examples: ['/', '/about', '/contact', '/custom-html'],
        pattern: '^/[a-z0-9-/]*$',
        help: 'Must start with / and use lowercase letters, numbers, hyphens',
      }),
    head: z
      .array(headElementSchema)
      .default([])
      .describe('List of head elements (meta tags, etc.)')
      .meta({
        title: 'Head Elements',
        minItems: 0,
        uiSchema: {
          'ui:ArrayFieldTemplate': 'collapsible',
          'ui:options': { orderable: true, removable: true, addable: true },
        },
      }),
    body: z
      .array(bodyElementSchema)
      .default([])
      .describe('List of body elements for page content')
      .meta({
        title: 'Body Elements',
        minItems: 1,
        uiSchema: {
          'ui:ArrayFieldTemplate': 'collapsible',
          'ui:options': { orderable: true, removable: true, addable: true },
        },
      }),
  })
  .strict()
  .meta({
    title: 'Page',
    description: 'A static page with customizable head and body content',
    version: pkg.version,
  })

export type PageSchema = z.infer<typeof pageSchema>

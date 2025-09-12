// Third-party imports
import { z } from 'zod/v4'

export const scriptElementSchema = z
  .object({
    tag: z
      .literal('script')
      .describe('Type of head element')
      .meta({
        title: 'Head Element Tag',
        examples: ['script'],
      }),
    src: z
      .string()
      .url()
      .optional()
      .describe('Source URL for external script')
      .meta({
        title: 'Script Source',
        placeholder: 'https://cdn.example.com/script.js',
        examples: [
          'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
          'https://unpkg.com/react@18/umd/react.production.min.js',
        ],
        help: 'URL to external JavaScript file',
      }),
    content: z
      .string()
      .optional()
      .describe('Inline script content')
      .meta({
        title: 'Script Content',
        placeholder: 'console.log("Hello World");',
        examples: ['console.log("Page loaded");', 'window.myApp = { version: "1.0" };'],
        help: 'JavaScript code to execute inline',
        uiSchema: { 'ui:widget': 'textarea', 'ui:rows': 3 },
      }),
    type: z
      .string()
      .optional()
      .describe('Script type attribute')
      .meta({
        title: 'Script Type',
        placeholder: 'text/javascript',
        examples: ['text/javascript', 'module', 'application/json'],
        help: 'MIME type of the script',
      }),
    async: z.boolean().optional().describe('Load script asynchronously').meta({
      title: 'Async Loading',
      help: 'Load the script asynchronously',
    }),
    defer: z.boolean().optional().describe('Defer script execution').meta({
      title: 'Defer Execution',
      help: 'Defer script execution until page is parsed',
    }),
  })
  .strict()
  .meta({
    title: 'Script Element',
    description: 'Script element configuration for page head section',
  })

export type ScriptElementSchema = z.infer<typeof scriptElementSchema>

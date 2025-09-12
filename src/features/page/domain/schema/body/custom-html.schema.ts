// Third-party imports
import { z } from 'zod/v4'

export const customHtmlBodyElementSchema = z
  .object({
    type: z
      .literal('custom-html')
      .describe('Type of body element')
      .meta({
        title: 'Body Element Type',
        examples: ['custom-html'],
      }),
    content: z
      .string()
      .trim()
      .min(1)
      .describe('HTML content for the body element')
      .meta({
        title: 'HTML Content',
        placeholder: '<h1>Your content here</h1>',
        examples: [
          '<h1>Welcome</h1>',
          '<div class="container"><p>Hello world</p></div>',
          '<section><h2>About</h2><p>Description</p></section>',
        ],
        help: 'Custom HTML content to be rendered in the page body',
        uiSchema: { 'ui:widget': 'textarea', 'ui:rows': 5 },
      }),
  })
  .strict()
  .meta({
    title: 'Body Element',
    description: 'Custom HTML element configuration for page body section',
  })

export type CustomHtmlBodyElementSchema = z.infer<typeof customHtmlBodyElementSchema>

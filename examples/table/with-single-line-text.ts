import type { Config } from '@latechforce/engine'

export const withSingleLineText: Config = {
  name: 'App with a table with a single line text field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'single_line_text',
          type: 'SingleLineText',
        },
      ],
    },
  ],
}

export default withSingleLineText

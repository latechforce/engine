import type { AppSchema } from '@/types'

export default {
  name: 'Configure a table with a single line text field',
  description: 'Table with a single line text field',
  tables: [
    {
      id: 1,
      name: 'My table',
      fields: [
        {
          id: 1,
          name: 'My field',
          type: 'single-line-text',
        },
      ],
    },
  ],
} satisfies AppSchema

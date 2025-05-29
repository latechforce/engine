import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Configure a table with a single line text column',
  description: 'Table with a single line text column',
  tables: [
    {
      id: 1,
      name: 'My table',
      columns: [
        {
          id: 1,
          name: 'My field',
          type: 'single-line-text',
        },
      ],
    },
  ],
} satisfies AppSchema

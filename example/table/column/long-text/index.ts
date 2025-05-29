import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Configure a table with a long text column',
  description: 'Table with a long text column',
  tables: [
    {
      id: 1,
      name: 'My table',
      columns: [
        {
          id: 1,
          name: 'My field',
          type: 'long-text',
        },
      ],
    },
  ],
} satisfies AppSchema

import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Configure a table with a long text field',
  description: 'Table with a long text field',
  tables: [
    {
      id: 1,
      name: 'My table',
      fields: [
        {
          id: 1,
          name: 'My field',
          type: 'long-text',
        },
      ],
    },
  ],
} satisfies AppSchema

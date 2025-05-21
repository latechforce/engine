import type { AppSchema } from '@/types'

export default {
  name: 'Long text field',
  description: 'Table with long text field',
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

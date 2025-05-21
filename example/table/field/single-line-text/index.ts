import type { AppSchema } from '@/types'

export default {
  name: 'Single line text field',
  description: 'Table with single line text field',
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

import type { AppSchema } from '@/types'

export const longTextField: AppSchema = {
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
}

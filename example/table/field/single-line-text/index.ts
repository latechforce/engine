import type { AppSchema } from '@/types'

export const singleLineTextField: AppSchema = {
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
}

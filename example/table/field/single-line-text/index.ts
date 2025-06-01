import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Configure a table with a single line text field',
  description: 'Table with a single line text field',
  tables: [
    {
      id: 1,
      name: 'Contacts',
      fields: [
        {
          id: 1,
          name: 'Name',
          type: 'single-line-text',
        },
      ],
    },
  ],
} satisfies AppSchema

import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Configure a table with a long text field',
  description: 'Table with a long text field',
  tables: [
    {
      id: 1,
      name: 'Contacts',
      fields: [
        {
          id: 1,
          name: 'Message',
          type: 'long-text',
        },
      ],
    },
  ],
} satisfies AppSchema

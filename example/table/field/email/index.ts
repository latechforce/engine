import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Configure a table with a email field',
  description: 'Table with a email field',
  tables: [
    {
      id: 1,
      name: 'Contacts',
      fields: [
        {
          id: 1,
          name: 'Email',
          type: 'email',
        },
      ],
    },
  ],
} satisfies AppSchema

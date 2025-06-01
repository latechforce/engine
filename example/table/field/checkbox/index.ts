import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Configure a table with a checkbox field',
  description: 'Table with a checkbox field',
  tables: [
    {
      id: 1,
      name: 'Contacts',
      fields: [
        {
          id: 1,
          name: 'Checkbox',
          type: 'checkbox',
        },
      ],
    },
  ],
} satisfies AppSchema

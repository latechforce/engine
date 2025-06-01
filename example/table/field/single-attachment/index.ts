import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Configure a table with a single attachment field',
  description: 'Table with a single attachment field',
  tables: [
    {
      id: 1,
      name: 'Contacts',
      fields: [
        {
          id: 1,
          name: 'Picture',
          type: 'single-attachment',
        },
      ],
    },
  ],
} satisfies AppSchema

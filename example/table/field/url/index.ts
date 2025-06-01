import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Configure a table with a URL field',
  description: 'Table with a URL field',
  tables: [
    {
      id: 1,
      name: 'Contacts',
      fields: [
        {
          id: 1,
          name: 'URL',
          type: 'url',
        },
      ],
    },
  ],
} satisfies AppSchema

import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Configure a table with a single select field',
  description: 'Table with a single select field',
  tables: [
    {
      id: 1,
      name: 'Contacts',
      fields: [
        {
          id: 1,
          name: 'First name',
          type: 'single-line-text',
        },
        {
          id: 2,
          name: 'Country',
          type: 'single-select',
          options: ['France', 'United States', 'United Kingdom'],
        },
      ],
    },
  ],
} satisfies AppSchema

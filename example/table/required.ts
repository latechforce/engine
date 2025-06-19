import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Configure a table with required fields',
  description: 'Configure a table with required fields',
  tables: [
    {
      id: 1,
      name: 'Users',
      fields: [
        {
          id: 1,
          name: 'First name',
          type: 'single-line-text',
          required: true,
        },
        {
          id: 2,
          name: 'Last name',
          type: 'single-line-text',
          required: true,
        },
      ],
    },
  ],
} satisfies AppSchema

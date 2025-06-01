import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Configure a table with a phone number field',
  description: 'Table with a phone number field',
  tables: [
    {
      id: 1,
      name: 'Contacts',
      fields: [
        {
          id: 1,
          name: 'Phone number',
          type: 'phone-number',
        },
      ],
    },
  ],
} satisfies AppSchema

import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Configure multiple tables',
  description: 'Configure multiple tables',
  tables: [
    {
      id: 1,
      name: 'Users',
      fields: [
        {
          id: 1,
          name: 'First name',
          type: 'single-line-text',
        },
        {
          id: 2,
          name: 'Last name',
          type: 'single-line-text',
        },
      ],
    },
    {
      id: 2,
      name: 'Posts',
      fields: [
        {
          id: 3,
          name: 'Title',
          type: 'single-line-text',
        },
        {
          id: 4,
          name: 'Content',
          type: 'long-text',
        },
      ],
    },
  ],
} satisfies AppSchema

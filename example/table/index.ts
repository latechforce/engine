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
        {
          id: 3,
          name: 'Picture',
          type: 'single-attachment',
        },
        {
          id: 4,
          name: 'Phone number',
          type: 'phone-number',
        },
        {
          id: 5,
          name: 'Email',
          type: 'email',
        },
        {
          id: 6,
          name: 'Is admin',
          type: 'checkbox',
        },
        {
          id: 7,
          name: 'Role',
          type: 'single-select',
          options: ['admin', 'user'],
        },
        {
          id: 8,
          name: 'Tags',
          type: 'single-select',
          options: ['tag1', 'tag2', 'tag3'],
        },
        {
          id: 9,
          name: 'Status',
          type: 'single-select',
          options: ['active', 'inactive'],
        },
      ],
    },
    {
      id: 2,
      name: 'Posts',
      fields: [
        {
          id: 1,
          name: 'Title',
          type: 'single-line-text',
        },
        {
          id: 2,
          name: 'Content',
          type: 'long-text',
        },
      ],
    },
  ],
} satisfies AppSchema

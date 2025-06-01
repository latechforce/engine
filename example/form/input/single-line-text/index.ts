import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Display a form with a single line text field',
  description: 'Form with a single line text field',
  forms: [
    {
      name: 'contact-us',
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/tables/Contacts',
      inputs: [
        {
          label: 'Name',
          name: 'name',
          type: 'single-line-text',
        },
      ],
    },
  ],
  tables: [
    {
      id: 1,
      name: 'Contacts',
      fields: [
        {
          id: 1,
          name: 'name',
          type: 'single-line-text',
        },
      ],
    },
  ],
} satisfies AppSchema

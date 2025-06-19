import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Display a form with a long text field',
  description: 'Form with a long text field',
  forms: [
    {
      id: 1,
      name: 'contact-us',
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/tables/1',
      inputs: [
        {
          label: 'Message',
          name: 'message',
          type: 'long-text',
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
          name: 'message',
          type: 'long-text',
        },
      ],
    },
  ],
} satisfies AppSchema

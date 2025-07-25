import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Display a form with an email field',
  description: 'Form with an email field',
  forms: [
    {
      id: 1,
      name: 'contact-us',
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/tables/1',
      inputs: [
        {
          label: 'Email',
          name: 'email',
          type: 'email',
          required: true,
        },
      ],
    },
  ],
  tables: [
    {
      id: 1,
      name: 'contacts',
      fields: [{ id: 1, name: 'email', type: 'email' }],
    },
  ],
} satisfies AppSchema

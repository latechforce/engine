import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Display a form with a checkbox field',
  description: 'Form with a checkbox field',
  forms: [
    {
      id: 1,
      name: 'contact-us',
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/tables/1',
      inputs: [
        {
          label: 'I agree to the terms and conditions',
          name: 'checkbox',
          type: 'checkbox',
        },
      ],
    },
  ],
  tables: [
    {
      id: 1,
      name: 'contacts',
      fields: [
        { id: 1, name: 'first_name', type: 'single-line-text' },
        { id: 2, name: 'checkbox', type: 'checkbox' },
      ],
    },
  ],
} satisfies AppSchema

import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Display a form with an phone number field',
  description: 'Form with an phone number field',
  forms: [
    {
      id: 1,
      name: 'contact-us',
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/tables/1',
      inputs: [
        {
          label: 'Phone number',
          name: 'phone-number',
          type: 'phone-number',
        },
      ],
    },
  ],
  tables: [
    {
      id: 1,
      name: 'contacts',
      fields: [{ id: 1, name: 'phone-number', type: 'phone-number' }],
    },
  ],
} satisfies AppSchema

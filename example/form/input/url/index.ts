import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Display a form with an url field',
  description: 'Form with an url field',
  forms: [
    {
      name: 'contact-us',
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/tables/1',
      inputs: [
        {
          label: 'URL',
          name: 'url',
          type: 'url',
        },
      ],
    },
  ],
  tables: [
    {
      id: 1,
      name: 'contacts',
      fields: [{ id: 1, name: 'url', type: 'url' }],
    },
  ],
} satisfies AppSchema

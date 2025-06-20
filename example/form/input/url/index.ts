import type { AppSchema } from '../../../../src/types'

export const inGuides = true

export default {
  name: 'Display a form with an url field',
  description: 'Form with an url field',
  forms: [
    {
      id: 1,
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

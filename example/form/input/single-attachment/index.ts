import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Display a form with a single attachment field',
  description: 'Form with a single attachment field',
  forms: [
    {
      name: 'contact-us',
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/tables/1',
      inputs: [
        {
          label: 'Attachment',
          name: 'attachment',
          type: 'single-attachment',
          accept: 'image/*',
        },
      ],
    },
  ],
  tables: [
    {
      id: 1,
      name: 'contact-us',
      fields: [
        { id: 1, name: 'first_name', type: 'single-line-text' },
        { id: 2, name: 'attachment', type: 'single-attachment' },
      ],
    },
  ],
} satisfies AppSchema

import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Display a form with a single select field',
  description: 'Form with a single select field',
  forms: [
    {
      name: 'contact-us',
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/tables/1',
      inputs: [
        {
          label: 'Select a color',
          name: 'select',
          type: 'single-select',
          defaultValue: 'red',
          options: [
            { label: 'Red', value: 'red' },
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
          ],
        },
      ],
    },
  ],
  tables: [
    {
      id: 1,
      name: 'contact-us',
      fields: [
        {
          id: 1,
          name: 'select',
          type: 'single-select',
          options: ['red', 'green', 'blue'],
        },
      ],
    },
  ],
} satisfies AppSchema

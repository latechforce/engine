import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Display a form with a single select field',
  description: 'Form with a single select field',
  forms: [
    {
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/automation/post',
      inputs: [
        {
          label: 'Select a color',
          name: 'select',
          type: 'single-select',
          options: ['Red', 'Green', 'Blue'],
        },
      ],
    },
  ],
} satisfies AppSchema

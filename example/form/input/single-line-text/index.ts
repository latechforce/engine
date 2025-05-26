import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Display a form with a single line text field',
  description: 'Form with a single line text field',
  forms: [
    {
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/automation/post',
      inputs: [
        {
          label: 'Name',
          name: 'name',
          type: 'single-line-text',
        },
      ],
    },
  ],
} satisfies AppSchema

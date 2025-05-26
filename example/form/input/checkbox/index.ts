import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Display a form with a checkbox field',
  description: 'Form with a checkbox field',
  forms: [
    {
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/automation/post',
      inputs: [
        {
          label: 'I agree to the terms and conditions',
          name: 'checkbox',
          type: 'checkbox',
        },
      ],
    },
  ],
} satisfies AppSchema

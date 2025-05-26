import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Display a form with a long text field',
  description: 'Form with a long text field',
  forms: [
    {
      title: 'Contact us',
      path: '/contact-us',
      action: '/api/automation/post',
      inputs: [
        {
          label: 'Message',
          name: 'message',
          type: 'long-text',
        },
      ],
    },
  ],
} satisfies AppSchema

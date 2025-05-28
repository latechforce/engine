import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Display a form',
  description: 'Form with a name input',
  forms: [
    {
      title: 'Contact us',
      description: 'Please fill in the form below to contact us.',
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

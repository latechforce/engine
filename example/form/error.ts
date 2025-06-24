import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Display a form',
  description: 'Form with a name input',
  forms: [
    {
      id: 1,
      name: 'contact-us',
      title: 'Contact us',
      description: 'Please fill in the form below to contact us.',
      path: '/contact-us',
      action: '/api/automations/throw-error',
      inputs: [
        {
          name: 'name',
          label: 'Name',
          description: 'Please enter your name',
          placeholder: 'Enter your name',
          required: true,
          type: 'single-line-text',
        },
      ],
    },
  ],
  automations: [
    {
      id: 1,
      name: 'contact-us',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/throw-error',
        },
      },
      actions: [
        {
          name: 'throw-error',
          service: 'code',
          action: 'run-typescript',
          params: {
            code: String(function () {
              throw new Error('This is an error message')
            }),
          },
        },
      ],
    },
  ],
} satisfies AppSchema

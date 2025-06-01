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
      action: '/api/automations/post',
      inputs: [
        {
          name: 'name',
          label: 'Name',
          description: 'Please enter your name',
          placeholder: 'Enter your name',
          required: true,
          type: 'single-line-text',
        },
        {
          name: 'email',
          label: 'Email',
          description: 'Please enter your email',
          placeholder: 'Enter your email',
          required: true,
          type: 'email',
        },
        {
          name: 'phone-number',
          label: 'Phone number',
          description: 'Please enter your phone number',
          placeholder: 'Enter your phone number',
          required: true,
          type: 'phone-number',
        },
        {
          name: 'message',
          label: 'Message',
          description: 'Please enter your message',
          placeholder: 'Enter your message',
          required: true,
          type: 'long-text',
        },
      ],
    },
  ],
} satisfies AppSchema

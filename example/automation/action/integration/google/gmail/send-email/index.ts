import type { AppSchema } from '@/types'
import googleGmailConnection from '@/example/connection/google/gmail'

export const inGuides = false

export default {
  name: 'Send an email',
  description: 'Automation with a Google Gmail send email action',
  automations: [
    {
      id: 1,
      name: 'send-email',
      trigger: {
        service: 'http',
        event: 'post',
        postHttp: {
          path: '/send-email',
        },
      },
      actions: [
        {
          name: 'send-email',
          service: 'google-gmail',
          action: 'send-email',
          account: 'Gmail',
          sendEmailGoogleGmail: {
            to: 'test@test.com',
            subject: 'Test',
            html: `Test`,
          },
        },
      ],
    },
  ],
  connections: googleGmailConnection.connections,
} satisfies AppSchema

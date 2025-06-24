import type { AppSchema } from '@/types'
import googleGmailConnection from '@/example/connection/google/gmail'
import { sendEmailResponse } from '@/e2e/__mocks__/google/gmail'
import type { Handlers } from '@/script/mock'
import { handlers as googleHandlers } from '@/example/connection/google'

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
        params: {
          path: '/send-email',
        },
      },
      actions: [
        {
          name: 'send-email',
          service: 'google-gmail',
          action: 'send-email',
          account: 'Gmail',
          params: {
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

export const handlers: Handlers = {
  ...googleHandlers,
  'https://www.googleapis.com/gmail/v1/users/me/messages': {
    POST: async () => ({
      json: { data: sendEmailResponse },
    }),
  },
}

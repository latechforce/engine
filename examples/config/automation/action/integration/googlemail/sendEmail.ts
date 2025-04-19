import type { Config } from '/src'

export const configAutomationActionIntegrationGoogleMailSendEmail: Config = {
  name: 'App with GoogleMail integration with SendEmail action',
  automations: [
    {
      name: 'sendEmail',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'send-email',
        output: {
          id: '{{sendEmail.messageId}}',
        },
      },
      actions: [
        {
          name: 'sendEmail',
          integration: 'GoogleMail',
          action: 'SendEmail',
          account: 'googlemail',
          email: {
            from: 'test@test.com',
            to: 'test@test.com',
            subject: 'ENGINE - TEST',
            text: 'ENGINE - TEST',
            html: 'ENGINE - TEST',
          },
        },
      ],
    },
  ],
}

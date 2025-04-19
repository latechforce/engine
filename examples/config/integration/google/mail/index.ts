import type { Config } from '/src'

export const configIntegrationGoogleMail: Config = {
  name: 'App with Google Mail integration',
  integrations: {
    google: {
      mail: [
        {
          account: 'google_mail_account',
          user: 'google_mail_user_email',
          password: 'google_mail_user_password',
        },
      ],
    },
  },
}

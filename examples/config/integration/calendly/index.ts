import type { Config } from '/src'

export const configIntegrationCalendly: Config = {
  name: 'App with Calendly integration',
  integrations: {
    calendly: [
      {
        account: 'calendly_account',
        accessToken: 'calendly_user_access_token',
      },
    ],
  },
}

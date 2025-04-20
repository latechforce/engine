import type { Config } from '/src'

export const configIntegrationCalendlyWithPort: Config = {
  name: 'App with Calendly integration with port',
  integrations: {
    calendly: [
      {
        account: 'calendly_account',
        accessToken: '{{ env.TEST_CALENDLY_ACCESS_TOKEN }}',
        clientId: '{{ env.TEST_CALENDLY_CLIENT_ID }}',
        clientSecret: '{{ env.TEST_CALENDLY_CLIENT_SECRET }}',
      },
    ],
  },
  services: {
    server: {
      port: 3000,
    },
  },
}

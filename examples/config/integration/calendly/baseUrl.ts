import type { Config } from '/src'

export const configIntegrationCalendlyBaseUrl: Config = {
  name: 'App with Calendly integration with baseUrl',
  integrations: {
    calendly: [
      {
        account: 'calendly_account',
        accessToken: '{{ env.TEST_CALENDLY_ACCESS_TOKEN }}',
        clientId: '{{ env.TEST_CALENDLY_CLIENT_ID }}',
        clientSecret: '{{ env.TEST_CALENDLY_CLIENT_SECRET }}',
        baseUrl: '{{ env.TEST_CALENDLY_BASE_URL }}',
      },
    ],
  },
}

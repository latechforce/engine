import type { Config } from '/src'

export const configIntegrationCalendlyBaseUrl: Config = {
  name: 'App with Calendly integration with baseUrl',
  integrations: {
    calendly: [
      {
        account: 'calendly_account',
        accessToken: '{{ env.TEST_CALENDLY_ACCESS_TOKEN }}',
        baseUrl: '{{ env.TEST_CALENDLY_BASE_URL }}',
      },
    ],
  },
}

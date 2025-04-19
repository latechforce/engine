import type { Config } from '/src'

export const configIntegrationQonto: Config = {
  name: 'App with Qonto integration',
  integrations: {
    qonto: [
      {
        account: 'qonto_account',
        organisationSlug: 'qonto_organisation_slug',
        secretKey: 'qonto_secret_key',
      },
    ],
  },
}

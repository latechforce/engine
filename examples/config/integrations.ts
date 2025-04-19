import type { Config } from '/src'

export const configIntegrations: Config = {
  name: 'App with integrations',
  integrations: {
    notion: [
      {
        account: 'notion_account',
        token: 'notion_token',
      },
    ],
    qonto: [
      {
        account: 'qonto_account',
        organisationSlug: 'qonto_organisation_slug',
        secretKey: 'qonto_secret_key',
      },
    ],
  },
}

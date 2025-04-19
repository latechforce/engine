import type { Config } from '/src'

export const configIntegrationAirtable: Config = {
  name: 'App with Airtable integration',
  integrations: {
    airtable: [
      {
        account: 'airtable_account',
        apiKey: 'airtable_api_key',
        databaseId: 'airtable_base_id',
      },
    ],
  },
}

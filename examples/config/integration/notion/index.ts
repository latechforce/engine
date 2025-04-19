import type { Config } from '/src'

export const configIntegrationNotion: Config = {
  name: 'App with Notion integration',
  integrations: {
    notion: [
      {
        account: 'notion_account',
        token: 'notion_token',
      },
    ],
  },
}

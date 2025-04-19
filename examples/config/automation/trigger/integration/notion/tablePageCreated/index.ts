import type { Config } from '/src'

export const configAutomationTriggerIntegrationNotionTablePageCreated: Config = {
  name: 'App with an automation with a notion table page created trigger',
  automations: [
    {
      name: 'NotionTablePageCreated',
      trigger: {
        integration: 'Notion',
        event: 'TablePageCreated',
        table: '{{ env.NOTION_TABLE_ID }}',
        account: 'notion',
      },
      actions: [],
    },
  ],
}

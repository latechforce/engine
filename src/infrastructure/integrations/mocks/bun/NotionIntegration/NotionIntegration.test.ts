import runner from 'bun:test'
import { testNotionIntegration } from 'test/e2e/integrations/notion.shared'
import { NotionIntegration } from '.'

const integration = new NotionIntegration({
  token: 'test',
})

await integration.connect()

await integration.addTable('table_1', [])

await integration.addUser({
  id: '1',
  email: 'test@test.com',
  name: 'test',
  avatarUrl: 'test',
})

testNotionIntegration(
  {
    ...runner,
    it: runner.it.skip,
    env: {
      TABLE_ID: 'table_1',
    },
  },
  integration
)

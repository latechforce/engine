import { NotionIntegration } from './NotionIntegration.mock'
import { testNotionIntegration } from './NotionIntegrationTest'

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

testNotionIntegration(integration, {
  TABLE_ID: 'table_1',
})

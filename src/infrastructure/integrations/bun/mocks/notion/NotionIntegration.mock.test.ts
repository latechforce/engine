import { NotionIntegration } from './NotionIntegration.mock'
import { testNotionIntegration } from '@infrastructure/integrations/common/notion/NotionIntegrationTest'
import BunTester from 'bun:test'

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

testNotionIntegration(BunTester, integration, {
  TABLE_ID: 'table_1',
})

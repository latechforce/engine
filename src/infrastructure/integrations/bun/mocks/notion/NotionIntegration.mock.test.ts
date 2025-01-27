import { NotionIntegration } from './NotionIntegration.mock'
import { testNotionIntegration } from '@infrastructure/integrations/common/notion/NotionIntegrationTest'
import BunTester from 'bun:test'
import { join } from 'path'
import fs from 'fs-extra'

await fs.ensureFile(join(process.cwd(), 'tmp', 'notion.db'))

const integration = new NotionIntegration({
  token: 'file:./tmp/notion.db',
})

await integration.connect()
await integration.addTable('table_1', [])
await integration.addUser({
  id: '1',
  email: 'test@test.com',
  name: 'test',
  avatarUrl: 'test',
})

const teardown = async () => {
  await fs.remove(join(process.cwd(), 'tmp', 'notion.db'))
  await fs.remove(join(process.cwd(), 'tmp', 'notion.db-shm'))
  await fs.remove(join(process.cwd(), 'tmp', 'notion.db-wal'))
}

testNotionIntegration(
  BunTester,
  integration,
  {
    TABLE_ID: 'table_1',
  },
  teardown
)

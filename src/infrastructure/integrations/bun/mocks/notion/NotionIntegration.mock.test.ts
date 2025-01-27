import { NotionIntegration } from './NotionIntegration.mock'
import { testNotionIntegration } from '@infrastructure/integrations/common/notion/NotionIntegrationTest'
import BunTester from 'bun:test'
import { join } from 'path'
import fs from 'fs-extra'

const path = join(process.cwd(), 'tmp', 'notion.db')

await fs.ensureFile(path)

const integration = new NotionIntegration({
  token: 'file:' + path,
})

await integration.addTable('table_1', [])
await integration.addUser({
  id: '1',
  email: 'test@test.com',
  name: 'test',
  avatarUrl: 'test',
})

const teardown = async () => {
  await fs.remove(path)
  await fs.remove(path + '-shm')
  await fs.remove(path + '-wal')
}

testNotionIntegration(
  BunTester,
  integration,
  {
    TABLE_ID: 'table_1',
  },
  teardown
)

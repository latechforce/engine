import { NotionIntegration } from './NotionIntegration.mock'
import { testNotionTableIntegration } from '@infrastructure/integrations/common/notion/NotionTableIntegrationTest'
import BunTester from 'bun:test'
import { sampleTable2, sampleTable1, sampleUser } from './NotionTableIntegration.mock'
import { join } from 'path'
import fs from 'fs-extra'

await fs.ensureFile(join(process.cwd(), 'tmp', 'notionTable.db'))

const integration = new NotionIntegration({
  token: 'file:./tmp/notionTable.db',
})

await integration.connect()
await integration.addTable(sampleTable2.name, sampleTable2.fields)
await integration.addTable(sampleTable1.name, sampleTable1.fields)
await integration.addUser(sampleUser)

const teardown = async () => {
  await fs.remove(join(process.cwd(), 'tmp', 'notionTable.db'))
  await fs.remove(join(process.cwd(), 'tmp', 'notionTable.db-shm'))
  await fs.remove(join(process.cwd(), 'tmp', 'notionTable.db-wal'))
}

testNotionTableIntegration(
  BunTester,
  integration,
  {
    TABLE_1_ID: 'table_1',
    TABLE_2_ID: 'table_2',
  },
  teardown
)

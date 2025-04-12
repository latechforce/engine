import { NotionIntegration } from './NotionIntegration.mock'
import {
  notionTableSample1,
  notionTableSample2,
  notionTableSample3,
  notionUserSample,
} from './NotionTestSamples'

export const integration = new NotionIntegration({
  name: 'test',
  baseUrl: ':memory:',
  token: 'test',
})

await integration.createToken('test')
await integration.addTableFromSchema(notionTableSample1)
await integration.addTableFromSchema(notionTableSample2)
await integration.addTableFromSchema(notionTableSample3)
await integration.addUser(notionUserSample)

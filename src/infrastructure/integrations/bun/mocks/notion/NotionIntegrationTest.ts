import { NotionIntegration } from './NotionIntegration.mock'
import {
  notionTableSample1,
  notionTableSample2,
  notionTableSample3,
  notionUserSample,
  type NotionTableSample1,
  type NotionTableSample2,
  type NotionTableSample3,
} from './NotionTestSamples'

export const integration = new NotionIntegration({
  name: 'test',
  baseUrl: ':memory:',
  token: 'test',
})

await integration.createToken('test')
await integration.addTable<NotionTableSample1>(notionTableSample1.name, notionTableSample1.fields)
await integration.addTable<NotionTableSample2>(notionTableSample2.name, notionTableSample2.fields)
await integration.addTable<NotionTableSample3>(notionTableSample3.name, notionTableSample3.fields)
await integration.addUser(notionUserSample)

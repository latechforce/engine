import { NotionIntegration } from './NotionIntegration.mock'
import { sampleTable2, sampleTable1, sampleUser } from './NotionTableIntegration.mock'

export const integration = new NotionIntegration({
  token: ':memory:',
})

await integration.addTable(sampleTable2.name, sampleTable2.fields)
await integration.addTable(sampleTable1.name, sampleTable1.fields)
await integration.addUser(sampleUser)

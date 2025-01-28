import { AirtableIntegration } from './AirtableIntegration.mock'
import { airtableTableSample1, airtableTableSample2 } from './AirtableTableIntegration.mock'

export const integration = new AirtableIntegration({
  apiKey: ':memory:',
  baseId: 'test',
})

await integration.addTable(airtableTableSample1.name, airtableTableSample1.fields)
await integration.addTable(airtableTableSample2.name, airtableTableSample2.fields)

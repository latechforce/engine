import { AirtableIntegration } from './AirtableIntegration.mock'
import {
  airtableTableSample1,
  airtableTableSample2,
  type AirtableTableSample1,
  type AirtableTableSample2,
} from './AirtableTestSamples'

export const integration = new AirtableIntegration({
  name: 'test',
  apiKey: 'test',
  databaseId: 'test',
  baseUrl: ':memory:',
})

await integration.addTable<AirtableTableSample1>(
  airtableTableSample1.name,
  airtableTableSample1.fields
)
await integration.addTable<AirtableTableSample2>(
  airtableTableSample2.name,
  airtableTableSample2.fields
)
await integration.createToken('test')

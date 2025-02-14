import { AirtableIntegration } from './AirtableIntegration.mock'
import {
  airtableTableSample1,
  airtableTableSample2,
  type AirtableTableSample1,
  type AirtableTableSample2,
} from './AirtableSample'

export const integration = new AirtableIntegration({
  apiKey: ':memory:',
  baseId: 'test',
})

await integration.addTable<AirtableTableSample1>(
  airtableTableSample1.name,
  airtableTableSample1.fields
)
await integration.addTable<AirtableTableSample2>(
  airtableTableSample2.name,
  airtableTableSample2.fields
)

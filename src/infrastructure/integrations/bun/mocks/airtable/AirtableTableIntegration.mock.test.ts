import BunTester from 'bun:test'
import { AirtableIntegration } from './AirtableIntegration.mock'
import { testAirtableTableIntegration } from '@infrastructure/integrations/common/airtable/AirtableTableIntegrationTest'

export const integration = new AirtableIntegration({
  apiKey: 'test',
  baseId: 'test',
})

await integration.connect()

await integration.addTable('table_2', [
  {
    name: 'name',
    type: 'SingleLineText',
  },
])

await integration.addTable('table_1', [
  {
    name: 'name',
    type: 'SingleLineText',
  },
  {
    name: 'number',
    type: 'Number',
  },
  {
    name: 'boolean',
    type: 'Checkbox',
  },
  {
    name: 'text',
    type: 'SingleLineText',
  },
  {
    name: 'url',
    type: 'SingleLineText',
  },
  {
    name: 'email',
    type: 'SingleLineText',
  },
  {
    name: 'phone',
    type: 'SingleLineText',
  },
  {
    name: 'single_select',
    type: 'SingleSelect',
    options: ['2', '1'],
  },
  {
    name: 'status',
    type: 'SingleSelect',
    options: ['Pas commencé', 'En cours', 'Terminé'],
  },
  {
    name: 'multi_select',
    type: 'MultipleSelect',
    options: ['4', '3', '2', '1'],
  },
  {
    name: 'date',
    type: 'DateTime',
  },
])

testAirtableTableIntegration(BunTester, integration, {
  TABLE_1_ID: 'table_1',
  TABLE_2_ID: 'table_2',
})

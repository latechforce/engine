import runner from 'bun:test'
import { testNotionTableIntegration } from 'test/e2e/integrations/notionTable.shared'
import { NotionIntegration } from '.'

const integration = new NotionIntegration({
  token: 'test',
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
  {
    name: 'people',
    type: 'MultipleSelect',
    options: ['1', '2'],
  },
  {
    name: 'files',
    type: 'MultipleAttachment',
  },
  {
    name: 'relation',
    type: 'MultipleLinkedRecord',
    table: 'table_2',
  },
  {
    name: 'rollup_names',
    type: 'Rollup',
    multipleLinkedRecord: 'relation',
    linkedRecordField: 'name',
    formula: "CONCAT(values, ', ')",
    output: {
      type: 'SingleLineText',
    },
  },
  {
    name: 'archived',
    type: 'Checkbox',
  },
])

await integration.addUser({
  id: '1',
  email: 'test@test.com',
  name: 'test',
  avatarUrl: 'test',
})

testNotionTableIntegration(
  {
    ...runner,
    env: {
      TABLE_1_ID: 'table_1',
      TABLE_2_ID: 'table_2',
    },
  },
  integration
)

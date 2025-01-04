import type { Config } from '@domain/interfaces'
import type { ITable } from '@domain/interfaces/ITable'

const fullConfig: Config = {
  name: 'App',
  tables: [
    {
      name: 'first_table',
      fields: [
        {
          name: 'name',
          type: 'SingleLineText',
        },
        {
          name: 'name_before_migration',
          type: 'SingleLineText',
        },
        {
          name: 'name_after_migration',
          type: 'SingleLineText',
          onMigration: {
            replace: 'name_before_migration',
          },
        },
        {
          name: 'description',
          type: 'LongText',
        },
        {
          name: 'date',
          type: 'DateTime',
        },
      ],
    },
  ],
}

type FirstTableFieldName =
  | 'name'
  | 'description'
  | 'name_before_migration'
  | 'name_after_migration'
  | 'date'

export function getFirstTableConfig(fields: FirstTableFieldName[] = ['name']): {
  name: string
  tables: ITable[]
} {
  const firstTable = fullConfig.tables?.find((table) => table.name === 'first_table')
  if (!firstTable) {
    throw new Error('First Table not found')
  }
  return {
    name: 'First Table',
    tables: [
      {
        ...firstTable,
        fields: firstTable.fields.filter((f) => fields.includes(f.name as FirstTableFieldName)),
      },
    ],
  }
}

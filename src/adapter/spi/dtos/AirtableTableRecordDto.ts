import type { AirtableTableRecordFields } from '/domain/integrations/Airtable/AirtableTypes'

export interface AirtableTableRecordDto<T extends AirtableTableRecordFields> {
  id: string
  fields: T
  created_time: string
}

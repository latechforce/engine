import type { CreateRecordDatabaseActionConfig } from '/domain/entities/Action/services/database/CreateRecord'

export interface ICreateRecordDatabaseAction extends CreateRecordDatabaseActionConfig {
  service: 'Database'
  action: 'CreateRecord'
}

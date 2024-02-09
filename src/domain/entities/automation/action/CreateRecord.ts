import type { Database } from '@domain/services/Database'
import { Base, type Params as BaseParams, type Interface } from './base'
import type { ToCreate } from '@domain/entities/record/ToCreate'

interface Params extends BaseParams {
  table: string
  recordToCreate: ToCreate
  database: Database
}

export class CreateRecord extends Base implements Interface {
  constructor(private params: Params) {
    super(params)
  }

  execute = async () => {
    const { table, recordToCreate, database } = this.params
    await database.table(table).insert(recordToCreate)
  }
}

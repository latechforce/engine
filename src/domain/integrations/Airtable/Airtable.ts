import type { AirtableCodeRunner } from './AirtableCodeRunner'
import { AirtableTable } from './AirtableTable'
import type { AirtableTableRecordFields } from './AirtableTypes'
import type { IAirtableSpi } from './IAirtableSpi'
import { Integration } from '../base'
import type { AirtableConfig } from './AirtableConfig'

export class Airtable extends Integration<AirtableConfig, IAirtableSpi> {
  constructor(spis: IAirtableSpi[]) {
    super(spis)
  }

  get codeRunnerIntegration(): AirtableCodeRunner {
    return {
      getTable: async <T extends AirtableTableRecordFields>(account: string, id: string) => {
        const {
          insert,
          insertMany,
          update,
          updateMany,
          delete: delete_,
          retrieve,
          list,
        } = await this.getTable<T>(account, id)
        return {
          insert,
          insertMany,
          update,
          updateMany,
          delete: delete_,
          retrieve,
          list,
        }
      },
    }
  }

  getTable = async <T extends AirtableTableRecordFields>(
    account: string,
    id: string
  ): Promise<AirtableTable<T>> => {
    const spiTable = await this._spi(account).getTable<T>(id)
    return new AirtableTable<T>(spiTable)
  }
}

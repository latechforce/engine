import type { IDatabaseDriver } from '/adapter/spi/drivers/DatabaseSpi'
import type { DatabaseConfig, DatabaseEventType } from '/domain/services/Database'
import type { EventDto } from '/adapter/spi/dtos/EventDto'
import { PostgreSQLDatabaseDriver } from '/infrastructure/drivers/common/DatabaseDriver/PostgreSQLDriver'
import { SQLiteDatabaseDriver } from './SQLite/SQLiteDriver'
import type { AutomationHistoryRecord } from '/domain/entities/Automation/History'
import type { TableConfig } from '/domain/entities/Table'
import type { TableSchema } from '../../../../adapter/api/schemas/TableSchema'
import { TableMapper } from '/adapter/api/mappers/TableMapper'

export class DatabaseDriver implements IDatabaseDriver {
  private _db: PostgreSQLDatabaseDriver | SQLiteDatabaseDriver
  public type: DatabaseConfig['type']

  constructor(config: DatabaseConfig) {
    this.type = config.type
    switch (this.type) {
      case 'SQLite':
        this._db = new SQLiteDatabaseDriver(config)
        break
      case 'PostgreSQL':
        this._db = new PostgreSQLDatabaseDriver(config)
        break
      default:
        throw new Error('Invalid driver')
    }
  }

  connect = async (): Promise<void> => {
    await this._db.connect()
  }

  disconnect = async (): Promise<void> => {
    await this._db.disconnect()
  }

  exec = async (query: string): Promise<void> => {
    await this._db.exec(query)
  }

  query = async <T>(
    text: string,
    values: (string | number | Buffer | Date)[] = []
  ): Promise<{ rows: T[]; rowCount: number }> => {
    return this._db.query(text, values)
  }

  table(table: TableConfig) {
    return this._db.table(table)
  }

  tableFromSchema(schema: TableSchema) {
    return this._db.table(TableMapper.toConfig(schema))
  }

  on = (event: DatabaseEventType, callback: (eventDto: EventDto) => void) => {
    this._db.on(event, callback)
  }

  setupTriggers = async (tables: string[]) => {
    await this._db.setupTriggers(tables)
  }

  waitForAutomationsHistories = async ({
    count = 1,
    status = 'succeed',
    timeout = 60000,
  }: {
    count?: number
    status?: string
    timeout?: number
  } = {}) => {
    let histories: AutomationHistoryRecord[] = []
    let retry = 0
    do {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const { rows } = await this.query<AutomationHistoryRecord>(
        'SELECT * FROM automations_histories_view WHERE status = ?',
        [status]
      )
      histories = rows
      retry++
    } while (histories.length < count && retry < Math.floor(timeout / 500))
    if (histories.length < count) {
      throw new Error(`Automations histories not found: ${count} ${status} histories`)
    }
    return histories
  }
}

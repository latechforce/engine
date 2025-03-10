import { DatabaseTableSpi, type IDatabaseTableDriver } from './DatabaseTableSpi'
import type {
  DatabaseDriverName,
  DatabaseErrorEvent,
  DatabaseEventType,
  DatabaseExec,
  DatabaseNotificationEvent,
  DatabaseQuery,
  IDatabaseSpi,
} from '/domain/services/Database'
import type { EventDto } from '../dtos/EventDto'
import { EventMapper } from '../mappers/EventMapper'
import type { ITable } from '/domain/interfaces/ITable'

export interface IDatabaseDriver {
  driver: DatabaseDriverName
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  table: (table: ITable) => IDatabaseTableDriver
  exec: DatabaseExec
  query: DatabaseQuery
  on: (event: DatabaseEventType, callback: (eventDto: EventDto) => void) => void
  setupTriggers: (tables: string[]) => Promise<void>
}

export class DatabaseSpi implements IDatabaseSpi {
  constructor(private _driver: IDatabaseDriver) {}

  table = (table: ITable) => {
    const databaseTableDriver = this._driver.table(table)
    return new DatabaseTableSpi(databaseTableDriver)
  }

  connect = async () => {
    await this._driver.connect()
  }

  disconnect = async () => {
    await this._driver.disconnect()
  }

  exec = async (query: string) => {
    await this._driver.exec(query)
  }

  query = async <T>(text: string, values: (string | number | Buffer | Date)[] = []) => {
    return this._driver.query<T>(text, values)
  }

  onError = (callback: (error: DatabaseErrorEvent) => void) => {
    this._driver.on('error', (eventDto: EventDto) => {
      const { event } = eventDto
      if (event === 'error') {
        const error = EventMapper.toErrorEntity(eventDto)
        callback(error)
      }
    })
  }

  onNotification = (callback: (notification: DatabaseNotificationEvent) => void) => {
    this._driver.on('notification', (eventDto: EventDto) => {
      const { event } = eventDto
      if (event === 'notification') {
        const notification = EventMapper.toNotificationEntity(eventDto)
        callback(notification)
      }
    })
  }

  setupTriggers = async (tables: string[]) => {
    await this._driver.setupTriggers(tables)
  }
}

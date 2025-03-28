import { Database } from 'bun:sqlite'
import fs from 'fs-extra'
import type { IDatabaseDriver } from '/adapter/spi/drivers/DatabaseSpi'
import type {
  DatabaseConfig,
  DatabaseDriverName,
  DatabaseEventType,
} from '/domain/services/Database'
import type { EventDto, EventNotificationDto } from '/adapter/spi/dtos/EventDto'
import { SQLiteDatabaseTableDriver } from './SQLiteTableDriver'
import type { ITable } from '/domain/interfaces/ITable'

interface Notification {
  id: number
  payload: string
  processed: number
}

export class SQLiteDatabaseDriver implements IDatabaseDriver {
  public db: Database
  public driver: DatabaseDriverName = 'SQLite'
  private _interval?: Timer
  private _onNotification: ((event: EventNotificationDto) => void)[] = []

  constructor(config: DatabaseConfig) {
    const { url } = config
    if (/[\\/]/.test(url)) if (!fs.existsSync(url)) fs.ensureFileSync(url)
    const db = new Database(url, { strict: true })
    db.run('PRAGMA journal_mode = WAL')
    db.run('PRAGMA foreign_keys = ON')
    this.db = db
  }

  connect = async (): Promise<void> => {
    if (this._interval) clearInterval(this._interval)
    this.db.run(`
      CREATE TABLE IF NOT EXISTS tables_notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        payload TEXT,
        processed INTEGER DEFAULT 0
      );
    `)
    const emitNotification = () => {
      try {
        const notifications = this.db
          .query<Notification, []>('SELECT * FROM tables_notifications WHERE processed = 0')
          .all()
        for (const { payload, id } of notifications) {
          this.db.prepare('UPDATE tables_notifications SET processed = 1 WHERE id = ?').run(id)
          const { record_id, table, action } = JSON.parse(payload)
          this._onNotification.forEach((callback) =>
            callback({ notification: { record_id, table, action }, event: 'notification' })
          )
        }
      } catch (error) {
        if (error instanceof Error) {
          clearInterval(this._interval)
        }
      }
    }
    this._interval = setInterval(emitNotification, 500)
  }

  disconnect = async (): Promise<void> => {
    if (this._interval) clearInterval(this._interval)
    this.db.close()
  }

  exec = async (query: string): Promise<void> => {
    this.db.run(query)
  }

  query = async <T>(
    text: string,
    values: (string | number | Buffer | Date)[] = []
  ): Promise<{ rows: T[]; rowCount: number }> => {
    const stmt = this.db.prepare(text)
    const isSelect = text.trim().toUpperCase().startsWith('SELECT')
    const parsedValues = values.map((value) => {
      if (value instanceof Date) {
        return value.getTime()
      }
      return value
    })
    if (isSelect) {
      const rows = stmt.all(...parsedValues) as T[]
      return { rows, rowCount: rows.length }
    } else {
      const info = stmt.run(...parsedValues)
      return { rows: [], rowCount: info.changes || 0 }
    }
  }

  table = (table: ITable) => {
    return new SQLiteDatabaseTableDriver(table, this.db)
  }

  on = (event: DatabaseEventType, callback: (eventDto: EventDto) => void) => {
    if (event === 'notification') {
      this._onNotification.push(callback)
    }
  }

  setupTriggers = async (tablesWithSchema: string[]) => {
    for (const tableWithSchema of tablesWithSchema) {
      this.db.run(`
        -- Trigger for INSERT
        CREATE TRIGGER IF NOT EXISTS after_insert_${tableWithSchema}_trigger
        AFTER INSERT ON ${tableWithSchema}
        BEGIN
            INSERT INTO tables_notifications (payload)
            VALUES (json_object('table', '${tableWithSchema}', 'action', 'INSERT', 'record_id', NEW.id));
        END;
        
        -- Trigger for UPDATE
        CREATE TRIGGER IF NOT EXISTS after_update_${tableWithSchema}_trigger
        AFTER UPDATE ON ${tableWithSchema}
        BEGIN
            INSERT INTO tables_notifications (payload)
            VALUES (json_object('table', '${tableWithSchema}', 'action', 'UPDATE', 'record_id', NEW.id));
        END;
        
        -- Trigger for DELETE
        CREATE TRIGGER IF NOT EXISTS after_delete_${tableWithSchema}_trigger
        AFTER DELETE ON ${tableWithSchema}
        BEGIN
            INSERT INTO tables_notifications (payload)
            VALUES (json_object('table', '${tableWithSchema}', 'action', 'DELETE', 'record_id', OLD.id));
        END;
      `)
    }
  }
}

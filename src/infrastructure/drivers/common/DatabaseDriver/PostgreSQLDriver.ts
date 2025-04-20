import pg from 'pg'
import type { IDatabaseDriver } from '/adapter/spi/drivers/DatabaseSpi'
import type { DatabaseConfig, DatabaseEventType, DatabaseType } from '/domain/services/Database'
import type { EventDto } from '/adapter/spi/dtos/EventDto'
import { PostgreSQLDatabaseTableDriver } from './PostgreSQLTableDriver'
import type { TableConfig } from '/domain/entities/Table'
import type { TableSchema } from '../../../../adapter/api/schemas/TableSchema'
import { TableMapper } from '/adapter/api/mappers/TableMapper'

export class PostgreSQLDatabaseDriver implements IDatabaseDriver {
  public db: pg.Pool
  public type: DatabaseType = 'PostgreSQL'
  private _client?: pg.PoolClient
  private _interval?: Timer

  constructor(config: DatabaseConfig) {
    const { url } = config
    const NUMERIC_OID = 1700
    const urlWithoutSslMode = url.includes('scalingo')
      ? url.replace(/sslmode=[^&]+/, 'sslmode=no-verify')
      : url
    const isProduction = process.env.NODE_ENV === 'production' && !process.env.CI
    const pool = new pg.Pool({
      connectionString: urlWithoutSslMode,
      ssl: isProduction ? { rejectUnauthorized: false } : false,
    })
    pool.on('error', (error) => {
      console.error(error)
    })
    pool.on('connect', (client) => {
      client.on('error', (error) => {
        console.error(error)
      })
      client.setTypeParser(NUMERIC_OID, (value) => parseFloat(value))
    })
    this.db = pool
  }

  connect = async (): Promise<void> => {
    this._client = await this.db.connect()
  }

  disconnect = async (): Promise<void> => {
    if (this._interval) clearInterval(this._interval)
    if (this._client) this._client.release()
    await this.db.end()
  }

  exec = async (query: string): Promise<void> => {
    if (this._client && query.includes('LISTEN')) await this._client.query(query)
    else await this.db.query(query)
  }

  query = async <T>(
    text: string,
    values: (string | number | Buffer | Date)[] = []
  ): Promise<{ rows: T[]; rowCount: number }> => {
    const { rows, rowCount } = await this.db.query(text, values).catch(async (error) => {
      if (!error.message.includes('does not exist') && !values.includes('__pgboss__send-it'))
        throw error
      return { rows: [], rowCount: 0 }
    })
    return { rows, rowCount: rowCount || 0 }
  }

  table = (table: TableConfig) => {
    return new PostgreSQLDatabaseTableDriver(table, this.db)
  }

  tableFromSchema = (schema: TableSchema) => {
    return this.table(TableMapper.toConfig(schema))
  }

  on = (event: DatabaseEventType, callback: (eventDto: EventDto) => void) => {
    if (this._client) {
      if (event === 'notification')
        this._client.on('notification', ({ payload }) => {
          if (payload) callback({ notification: JSON.parse(payload), event: 'notification' })
        })
      if (event === 'error')
        this._client.on('error', ({ message }) => {
          callback({ message, event: 'error' })
        })
    }
    this.db.on('error', ({ message }) => {
      callback({ message, event: 'error' })
    })
  }

  setupTriggers = async (tablesWithSchema: string[]) => {
    await this.db.query(`
      CREATE OR REPLACE FUNCTION notify_trigger_func() RETURNS trigger AS $$
      BEGIN
        IF TG_OP = 'INSERT' THEN
          PERFORM pg_notify('realtime', json_build_object('table', TG_TABLE_NAME, 'action', TG_OP, 'record_id', NEW.id)::text);
          RETURN NEW;
        ELSIF TG_OP = 'UPDATE' THEN
          PERFORM pg_notify('realtime', json_build_object('table', TG_TABLE_NAME, 'action', TG_OP, 'record_id', NEW.id)::text);
          RETURN NEW;
        ELSIF TG_OP = 'DELETE' THEN
          PERFORM pg_notify('realtime', json_build_object('table', TG_TABLE_NAME, 'action', TG_OP, 'record_id', OLD.id)::text);
          RETURN OLD;
        END IF;
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;
    `)
    for (const tableWithSchema of tablesWithSchema) {
      const [schema, table] = tableWithSchema.split('.')
      await this.db.query(`
        DO $$
        DECLARE
            trigger_name text;
        BEGIN
            -- Check and create trigger for AFTER INSERT
            trigger_name := '${schema}_${table}_after_insert';
            IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = trigger_name) THEN
                EXECUTE format('CREATE TRIGGER %I AFTER INSERT ON ${schema}.${table} FOR EACH ROW EXECUTE FUNCTION notify_trigger_func();', trigger_name);
            END IF;
        
            -- Check and create trigger for AFTER UPDATE
            trigger_name := '${schema}_${table}_after_update';
            IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = trigger_name) THEN
                EXECUTE format('CREATE TRIGGER %I AFTER UPDATE ON ${schema}.${table} FOR EACH ROW EXECUTE FUNCTION notify_trigger_func();', trigger_name);
            END IF;
        
            -- Check and create trigger for AFTER DELETE
            trigger_name := '${schema}_${table}_after_delete';
            IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = trigger_name) THEN
                EXECUTE format('CREATE TRIGGER %I AFTER DELETE ON ${schema}.${table} FOR EACH ROW EXECUTE FUNCTION notify_trigger_func();', trigger_name);
            END IF;
        END $$;
      `)
    }
  }
}

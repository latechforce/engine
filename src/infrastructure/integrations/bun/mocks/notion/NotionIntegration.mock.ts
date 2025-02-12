import type { INotionIntegration } from '/adapter/spi/integrations/NotionSpi'
import { NotionTableIntegration } from './NotionTableIntegration.mock'
import type { NotionConfig } from '/domain/integrations/Notion'
import type { NotionUserDto } from '/adapter/spi/dtos/NotionUserDto'
import { SQLiteDatabaseDriver } from '/infrastructure/drivers/bun/DatabaseDriver/SQLiteDriver'
import { SQLiteDatabaseTableDriver } from '/infrastructure/drivers/bun/DatabaseDriver/SQLiteTableDriver'
import type { RecordFields } from '/domain/entities/Record'
import type { IField } from '/domain/interfaces/IField'
import slugify from 'slugify'

export interface TableObject extends RecordFields {
  title: string
  properties: string
}

export interface UserObject extends RecordFields {
  email: string
  name: string | null
  avatarUrl: string | null
}

export class NotionIntegration implements INotionIntegration {
  private _db: SQLiteDatabaseDriver
  private _tables?: SQLiteDatabaseTableDriver
  private _users?: SQLiteDatabaseTableDriver

  constructor(private _config?: NotionConfig) {
    this._db = new SQLiteDatabaseDriver({
      url: _config?.token ?? 'file::memory:?cache=shared',
      driver: 'SQLite',
    })
  }

  connect = async () => {
    await this._db.connect()
    this._tables = this._db.table({
      name: 'tables',
      fields: [
        {
          name: 'title',
          type: 'SingleLineText',
        },
        {
          name: 'properties',
          type: 'LongText',
        },
      ],
    })
    this._users = this._db.table({
      name: 'users',
      fields: [
        {
          name: 'email',
          type: 'SingleLineText',
        },
        {
          name: 'name',
          type: 'SingleLineText',
        },
        {
          name: 'avatarUrl',
          type: 'SingleLineText',
        },
      ],
    })
    if (!(await this._tables.exists())) {
      await this._tables.create()
      await this._tables.createView()
    }
    if (!(await this._users.exists())) {
      await this._users.create()
      await this._users.createView()
    }
  }

  getConfig = () => {
    if (!this._config) {
      throw new Error('Notion config not set')
    }
    return this._config
  }

  getTable = async (tableName: string) => {
    const id = this._slugify(tableName)
    const tables = await this._tablesOrThrow()
    const table = await tables.readById<TableObject>(id)
    if (!table) {
      throw new Error('Table not found')
    }
    const { properties } = table.fields
    const fields = JSON.parse(String(properties))
    const notionTable = new NotionTableIntegration(
      this._db.table({
        name: id,
        fields,
      }),
      table
    )
    const exist = await notionTable.exists()
    if (!exist) {
      await notionTable.create()
      await notionTable.createView()
    }
    return notionTable
  }

  listAllUsers = async (): Promise<NotionUserDto[]> => {
    const users = await this._usersOrThrow()
    const list = await users.list<UserObject>()
    return list.map((user) => ({
      id: user.id,
      email: user.fields.email,
      name: user.fields.name || '',
      avatarUrl: user.fields.avatarUrl || '',
    }))
  }

  addTable = async (name: string, properties: IField[]) => {
    const tables = await this._tablesOrThrow()
    const id = this._slugify(name)
    const table = await tables.readById<TableObject>(id)
    if (!table)
      await tables.insert<TableObject>({
        id,
        fields: { title: name, properties: JSON.stringify(properties) },
        created_at: new Date().toISOString(),
      })
    return this.getTable(name)
  }

  addUser = async (user: NotionUserDto) => {
    const users = await this._usersOrThrow()
    await users.insert<UserObject>({
      id: user.id,
      fields: {
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      created_at: new Date().toISOString(),
    })
  }

  private _slugify = (name: string) => {
    return slugify(name, { lower: true, replacement: '_', strict: true })
  }

  private _tablesOrThrow = async () => {
    if (!this._tables) {
      await this.connect()
      if (!this._tables) {
        throw new Error('Tables table not found')
      }
    }
    return this._tables
  }

  private _usersOrThrow = async () => {
    if (!this._users) {
      await this.connect()
      if (!this._users) {
        throw new Error('Users table not found')
      }
    }
    return this._users
  }
}

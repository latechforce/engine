import App from '@latechforce/engine'
import { drivers, integrations } from '@latechforce/engine/bun'
import { join } from 'path'
import { nanoid } from 'nanoid'
import fs from 'fs-extra'
import { DatabaseDriver } from '@infrastructure/drivers/bun/DatabaseDriver'
import { StorageDriver } from '@infrastructure/drivers/shared/StorageDriver'
import { NotionIntegration } from '@infrastructure/integrations/mocks/bun/NotionIntegration'
import { QontoIntegration } from '@infrastructure/integrations/mocks/bun/QontoIntegration'
import { PappersIntegration } from '@infrastructure/integrations/mocks/bun/PappersIntegration'
import type { DatabaseConfig } from '@domain/services/Database'
import type { Config, StartedApp } from '@latechforce/engine'
import type { NotionConfig } from '@domain/integrations/Notion'
import env from './env'

type Tester = {
  describe: (message: string, tests: () => void) => void
  beforeEach: (fn: () => Promise<void>) => void
  afterEach: (fn: () => Promise<void>) => void
}

type DriverType = 'Database' | 'Storage'
type IntegrationType = 'Notion' | 'Qonto' | 'Pappers'

// Generic definitions for drivers
type WithDriverInput<D extends DriverType[]> = { drivers: D }
type WithDriverOutput<D extends DriverType> = D extends 'Database'
  ? DatabaseDriver
  : D extends 'Storage'
    ? StorageDriver
    : never

// Generic definitions for integrations
type WithIntegrationInput<I extends IntegrationType[]> = { integrations: I }
type WithIntegrationOutput<I extends IntegrationType> = I extends 'Notion'
  ? NotionIntegration
  : I extends 'Qonto'
    ? QontoIntegration
    : I extends 'Pappers'
      ? PappersIntegration
      : never

type WithOptions<D extends DriverType[] = [], I extends IntegrationType[] = []> =
  | WithDriverInput<D>
  | WithIntegrationInput<I>
  | (WithDriverInput<D> & WithIntegrationInput<I>)
  | {}

type Request = {
  get: (url: string) => Promise<any>
  post: (url: string, body?: unknown) => Promise<any>
  patch: (url: string, body?: unknown) => Promise<any>
}
type TestApp = {
  start: (_: Config) => Promise<StartedApp>
  stop: () => Promise<void>
}

export class BunApp extends App {
  constructor() {
    super({ drivers, integrations: integrations.mocks })
  }
}

export class IntegrationTest {
  constructor(private tester: Tester) {}

  get request(): Request {
    return {
      get: async (url: string) => {
        return fetch(url)
          .then((res) => res.json())
          .catch((error) => {
            console.error(error)
            return error
          })
      },
      post: async (url: string, body: unknown = {}) => {
        return fetch(url, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((res) => res.json())
          .catch((error) => {
            console.error(error)
            return error
          })
      },
      patch: async (url: string, body: unknown = {}) => {
        return fetch(url, {
          method: 'PATCH',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((res) => res.json())
          .catch((error) => {
            console.error(error)
            return error
          })
      },
    }
  }

  with<D extends DriverType[] = [], I extends IntegrationType[] = []>(
    options: WithOptions<D, I>,
    tests: (helper: {
      app: TestApp
      request: Request
      drivers: D extends (infer U)[]
        ? { [K in U & DriverType as Lowercase<K>]: WithDriverOutput<K> }
        : {}
      integrations: I extends (infer V)[]
        ? { [J in V & IntegrationType as Lowercase<J>]: WithIntegrationOutput<J> }
        : {}
    }) => void
  ): void {
    const drivers: any = {}
    const integrations: any = {}
    const extendsConfig: Partial<Config> = {}
    const app: TestApp = {
      start: async (_: Config): Promise<StartedApp> => {
        throw new Error('App must be initialized before starting')
      },
      stop: async (): Promise<void> => {
        throw new Error('App must be initialized before stopping')
      },
    }

    this.tester.beforeEach(async () => {
      if ('drivers' in options) {
        if (options.drivers.includes('Database')) {
          const url = join(process.cwd(), 'tmp', `database-${nanoid()}.db`)
          await fs.ensureFile(url)
          const config: DatabaseConfig = { driver: 'SQLite', url }
          const database = new DatabaseDriver(config)
          drivers.database = database
          extendsConfig.database = config
        }
        if (options.drivers.includes('Storage')) {
          if (!drivers.database) {
            throw new Error('Database must be initialized before Storage')
          }
          drivers.storage = new StorageDriver(drivers.database)
        }
      }
      if ('integrations' in options) {
        extendsConfig.integrations = {}
        if (options.integrations.includes('Notion')) {
          const config: NotionConfig = {
            token: env.TEST_NOTION_TOKEN,
            pollingInterval: 1,
          }
          integrations.notion = new NotionIntegration(config)
          extendsConfig.integrations.notion = config
        }
        if (options.integrations.includes('Qonto')) {
          integrations.qonto = new QontoIntegration()
        }
        if (options.integrations.includes('Pappers')) {
          integrations.pappers = new PappersIntegration()
        }
      }
      let startedApp: StartedApp | undefined
      app.start = async (config: Config) => {
        if (integrations.notion) {
          await integrations.notion.connect()
          for (const table of config.tables || []) {
            console.log('table', table)
            await integrations.notion.addTable(table.name, table.fields)
          }
        }
        startedApp = await new BunApp().start({ ...config, ...extendsConfig })
        return startedApp
      }
      app.stop = async () => {
        await startedApp?.stop()
      }
    })

    this.tester.afterEach(async () => {
      await app.stop()
      if (
        'drivers' in options &&
        options.drivers?.includes('Database') &&
        extendsConfig.database?.url
      ) {
        await fs.remove(extendsConfig.database.url)
      }
    })

    tests({
      drivers,
      integrations,
      request: this.request,
      app,
    })
  }
}

export type { Config }

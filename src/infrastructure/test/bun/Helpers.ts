import type { Config, StartedApp } from '../../..'
import { join } from 'path'
import { nanoid } from 'nanoid'
import fs from 'fs-extra'
import { DatabaseDriver } from '/infrastructure/drivers/bun/DatabaseDriver'
import { StorageDriver } from '/infrastructure/drivers/common/StorageDriver'
import { NotionIntegration } from '/infrastructure/integrations/bun/mocks/notion/NotionIntegration.mock'
import { QontoIntegration } from '/infrastructure/integrations/bun/mocks/qonto/QontoIntegration.mock'
import { PappersIntegration } from '/infrastructure/integrations/bun/mocks/pappers/PappersIntegration.mock'
import type { DatabaseConfig } from '/domain/services/Database'
import type { NotionConfig } from '/domain/integrations/Notion'
import type { QontoConfig } from '/domain/integrations/Qonto'
import type { PappersConfig } from '/domain/integrations/Pappers'
import { AirtableIntegration } from '/infrastructure/integrations/bun/mocks/airtable/AirtableIntegration.mock'
import type { AirtableConfig } from '/domain/integrations/Airtable'
import { MockedApp } from './MockedApp'
import { MockedFetcherDriver } from './MockedFetcherDriver'
import { GoogleMailIntegration } from '/infrastructure/integrations/bun/mocks/google/mail/GoogleMailIntegration.mock'
import type { GoogleMailConfig } from '/domain/integrations/Google/GoogleMail'
import { GoCardlessIntegration } from '/infrastructure/integrations/bun/mocks/gocardless/GoCardlessIntegration.mock'
import type { GoCardlessConfig } from '/domain/integrations/GoCardless'

type Tester = {
  describe: (message: string, tests: () => void) => void
  beforeEach: (fn: () => Promise<void>) => void
  afterEach: (fn: () => Promise<void>) => void
  afterAll: (fn: () => Promise<void>) => void
}

type DriverType = 'Database' | 'Storage' | 'Fetcher'
type IntegrationType = 'Notion' | 'Qonto' | 'Pappers' | 'Airtable' | 'GoogleMail' | 'GoCardless'

// Generic definitions for drivers
type WithDriverInput<D extends DriverType[]> = { drivers: D }
type WithDriverOutput<D extends DriverType> = D extends 'Database'
  ? DatabaseDriver
  : D extends 'Storage'
    ? StorageDriver
    : D extends 'Fetcher'
      ? MockedFetcherDriver
      : never

// Generic definitions for integrations
type WithIntegrationInput<I extends IntegrationType[]> = { integrations: I }
type WithIntegrationOutput<I extends IntegrationType> = I extends 'Notion'
  ? NotionIntegration
  : I extends 'Airtable'
    ? AirtableIntegration
    : I extends 'Qonto'
      ? QontoIntegration
      : I extends 'Pappers'
        ? PappersIntegration
        : I extends 'GoogleMail'
          ? GoogleMailIntegration
          : I extends 'GoCardless'
            ? GoCardlessIntegration
            : never

type WithOptions<D extends DriverType[] = [], I extends IntegrationType[] = []> =
  | WithDriverInput<D>
  | WithIntegrationInput<I>
  | (WithDriverInput<D> & WithIntegrationInput<I>)
  | {}

type Request = {
  get: <T = any>(url: string, options?: RequestInit) => Promise<T>
  post: <T = any>(url: string, body?: unknown, options?: RequestInit) => Promise<T>
  patch: <T = any>(url: string, body?: unknown, options?: RequestInit) => Promise<T>
}
type TestApp = {
  start: (_: Config) => Promise<StartedApp>
  stop: () => Promise<void>
}

export class Helpers {
  constructor(private tester: Tester) {}

  get request(): Request {
    return {
      get: async <T = any>(url: string, options: RequestInit = {}): Promise<T> => {
        return fetch(url, options)
          .then((res) => res.json())
          .catch((error) => {
            console.error(error)
            return error
          })
      },
      post: async <T = any>(
        url: string,
        body: unknown = {},
        options: RequestInit = {}
      ): Promise<T> => {
        return fetch(url, {
          ...options,
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) },
        })
          .then((res) => res.json())
          .catch((error) => {
            console.error(error)
            return error
          })
      },
      patch: async <T = any>(
        url: string,
        body: unknown = {},
        options: RequestInit = {}
      ): Promise<T> => {
        return fetch(url, {
          ...options,
          method: 'PATCH',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) },
        })
          .then((res) => res.json())
          .catch((error) => {
            console.error(error)
            return error
          })
      },
    }
  }

  testWithMockedApp<D extends DriverType[] = [], I extends IntegrationType[] = []>(
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
    let files: string[] = []
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

    async function getTestDbUrl(name: string) {
      const url = join(process.cwd(), 'tmp', `${name}-${nanoid()}.db`)
      await fs.ensureFile(url)
      files.push(url)
      return url
    }

    this.tester.beforeEach(async () => {
      if ('drivers' in options) {
        if (options.drivers.includes('Database')) {
          const config: DatabaseConfig = { driver: 'SQLite', url: await getTestDbUrl('database') }
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
        if (options.drivers.includes('Fetcher')) {
          const fetcher = new MockedFetcherDriver()
          drivers.fetcher = fetcher
        }
      }
      extendsConfig.integrations = {}
      if ('integrations' in options) {
        if (options.integrations.includes('Notion')) {
          const config: NotionConfig = {
            token: await getTestDbUrl('notion'),
            pollingInterval: 1,
          }
          integrations.notion = new NotionIntegration(config)
          extendsConfig.integrations.notion = config
        }
        if (options.integrations.includes('Airtable')) {
          const config: AirtableConfig = {
            apiKey: await getTestDbUrl('airtable'),
            baseId: 'test',
          }
          integrations.airtable = new AirtableIntegration(config)
          extendsConfig.integrations.airtable = config
        }
        if (options.integrations.includes('Qonto')) {
          const config: QontoConfig = {
            environment: 'production',
            organisationSlug: 'test',
            secretKey: await getTestDbUrl('qonto'),
          }
          integrations.qonto = new QontoIntegration(config)
          extendsConfig.integrations.qonto = config
        }
        if (options.integrations.includes('GoogleMail')) {
          const config: GoogleMailConfig = {
            user: 'test',
            password: await getTestDbUrl('googlemail'),
          }
          integrations.googleMail = new GoogleMailIntegration(config)
          if (!extendsConfig.integrations.google) extendsConfig.integrations.google = {}
          extendsConfig.integrations.google.mail = config
        }
        if (options.integrations.includes('Pappers')) {
          const config: PappersConfig = {
            apiKey: await getTestDbUrl('pappers'),
          }
          integrations.pappers = new PappersIntegration(config)
          extendsConfig.integrations.pappers = config
        }
        if (options.integrations.includes('GoCardless')) {
          const config: GoCardlessConfig = {
            environment: 'production',
            accessToken: await getTestDbUrl('gocardless'),
          }
          integrations.gocardless = new GoCardlessIntegration(config)
          extendsConfig.integrations.gocardless = config
        }
      }
      let startedApp: StartedApp | undefined
      app.start = async (config: Config) => {
        const options = { drivers: { fetcher: () => drivers.fetcher } }
        startedApp = await new MockedApp(options).start({
          loggers: [],
          ...config,
          ...extendsConfig,
        })
        return startedApp
      }
      app.stop = async () => {
        if (startedApp) await startedApp.stop()
      }
    })

    this.tester.afterEach(async () => {
      await app.stop()
      for (const file of files) await fs.unlink(file)
      files = []
    })

    tests({
      drivers,
      integrations,
      request: this.request,
      app,
    })
  }
}

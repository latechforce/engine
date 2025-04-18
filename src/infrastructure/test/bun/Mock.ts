import type { Config, StartedApp } from '../../..'
import { join } from 'path'
import { nanoid } from 'nanoid'
import fs from 'fs-extra'
import puppeteer, { type Browser, type Page } from 'puppeteer'
import { DatabaseDriver } from '/infrastructure/drivers/bun/DatabaseDriver'
import { StorageDriver } from '/infrastructure/drivers/bun/StorageDriver'
import { NotionIntegration } from '/infrastructure/integrations/bun/mocks/notion/NotionIntegration.mock'
import { QontoIntegration } from '/infrastructure/integrations/bun/mocks/qonto/QontoIntegration.mock'
import { PappersIntegration } from '/infrastructure/integrations/bun/mocks/pappers/PappersIntegration.mock'
import type { DatabaseConfig } from '/domain/services/Database'
import type { NotionConfig } from '/domain/integrations/Notion'
import type { QontoConfig } from '/domain/integrations/Qonto/QontoConfig'
import type { PappersConfig } from '/domain/integrations/Pappers/PappersConfig'
import { AirtableIntegration } from '/infrastructure/integrations/bun/mocks/airtable/AirtableIntegration.mock'
import type { AirtableConfig } from '/domain/integrations/Airtable'
import { MockedApp } from './MockedApp'
import { MockedFetcherDriver } from './MockedFetcherDriver'
import { GoogleMailIntegration } from '/infrastructure/integrations/bun/mocks/google/mail/GoogleMailIntegration.mock'
import type { GoogleMailConfig } from '/domain/integrations/Google/Mail'
import { GoCardlessIntegration } from '/infrastructure/integrations/bun/mocks/gocardless/GoCardlessIntegration.mock'
import type { GoCardlessConfig } from '/domain/integrations/GoCardless'
import type { PhantombusterConfig } from '/domain/integrations/Phantombuster'
import { PhantombusterIntegration } from '/infrastructure/integrations/bun/mocks/phantombuster/PhantombusterIntegration.mock'
import { CalendlyIntegration } from '/infrastructure/integrations/bun/mocks/calendly/CalendlyIntegration.mock'
import type { CalendlyConfig } from '/domain/integrations/Calendly/CalendlyConfig'
import { YouCanBookMeIntegration } from '/infrastructure/integrations/bun/mocks/youcanbookme/YouCanBookMeIntegration.mock'
import type { YouCanBookMeConfig } from '/domain/integrations/YouCanBookMe/YouCanBookMeConfig'
import type { JotformConfig } from '/domain/integrations/Jotform/JotformConfig'
import { JotformIntegration } from '/infrastructure/integrations/bun/mocks/jotform/JotformIntegration.mock'

type Tester = {
  describe: (message: string, tests: () => void) => void
  beforeAll: (fn: () => Promise<void>) => void
  beforeEach: (fn: () => Promise<void>) => void
  afterEach: (fn: () => Promise<void>) => void
  afterAll: (fn: () => Promise<void>) => void
}

type DriverType = 'Database' | 'Storage' | 'Fetcher'
type IntegrationType =
  | 'Notion'
  | 'Qonto'
  | 'Pappers'
  | 'Airtable'
  | 'GoogleMail'
  | 'GoCardless'
  | 'Phantombuster'
  | 'Calendly'
  | 'YouCanBookMe'
  | 'Jotform'

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
            : I extends 'Phantombuster'
              ? PhantombusterIntegration
              : I extends 'Calendly'
                ? CalendlyIntegration
                : I extends 'YouCanBookMe'
                  ? YouCanBookMeIntegration
                  : I extends 'Jotform'
                    ? JotformIntegration
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
type App = {
  start: (_: Config) => Promise<StartedApp>
  stop: () => Promise<void>
}

type AppHelpers<D extends DriverType[], I extends IntegrationType[]> = {
  app: App
  drivers: D extends (infer U)[]
    ? { [K in U & DriverType as Lowercase<K>]: WithDriverOutput<K> }
    : {}
  integrations: I extends (infer V)[]
    ? { [J in V & IntegrationType as Lowercase<J>]: WithIntegrationOutput<J> }
    : {}
}

type PageHelpers = Page & {
  waitForText: (text: string) => Promise<void>
  waitForUrl: (url: string) => Promise<void>
  waitForTimeout: (ms: number) => Promise<void>
}

export class Mock<D extends DriverType[] = [], I extends IntegrationType[] = []> {
  constructor(
    private tester: Tester,
    private options: WithOptions<D, I> = {}
  ) {}

  app(tests: (helpers: AppHelpers<D, I>) => void): void {
    const { app, drivers, integrations } = this._prepare()
    tests({ app, drivers, integrations })
  }

  request(tests: (helper: AppHelpers<D, I> & { request: Request }) => void): void {
    const { app, drivers, integrations } = this._prepare()
    const request = {
      get: async <T = any>(url: string, options: RequestInit = {}): Promise<T> => {
        return fetch(url, options)
          .then((res) => {
            const headers = new Headers(options.headers)
            return headers.get('Accept') !== 'application/json' ? res.text() : res.json()
          })
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
    tests({ app, drivers, integrations, request })
  }

  page(
    tests: (
      helpers: AppHelpers<D, I> & {
        browser: { newPage: (options?: { headless?: boolean }) => Promise<PageHelpers> }
      }
    ) => void
  ): void {
    const { app, drivers, integrations } = this._prepare()
    let mainBrowser: Browser | undefined
    let isMainBrowserConnected = false
    let browsers: Browser[] = []
    let pages: Page[] = []
    const browserPage: any = {}

    this.tester.describe('ui', () => {
      this.tester.beforeAll(async () => {
        mainBrowser = await puppeteer.launch({
          args: process.env.CI ? ['--no-sandbox', '--disable-setuid-sandbox'] : [],
          headless: true,
        })
        isMainBrowserConnected = true
        mainBrowser.on('disconnected', () => {
          isMainBrowserConnected = false
        })
        browsers.push(mainBrowser)
      })

      this.tester.beforeEach(async () => {
        browserPage.newPage = async (options?: { headless?: boolean }) => {
          let page: PageHelpers
          if (options || !isMainBrowserConnected) {
            const { headless = true } = options ?? {}
            const newBrowser = await puppeteer.launch({
              args: process.env.CI ? ['--no-sandbox', '--disable-setuid-sandbox'] : [],
              headless: process.env.CI ? true : headless,
            })
            browsers.push(newBrowser)
            page = (await newBrowser.newPage()) as PageHelpers
          } else {
            if (!mainBrowser) throw new Error('Browser not initialized')
            page = (await mainBrowser.newPage()) as PageHelpers
          }
          page.waitForText = async (text: string) => {
            await page.waitForFunction(
              (text: string) => document.body.innerText.includes(text),
              {},
              text
            )
          }
          page.waitForUrl = async (url: string) => {
            await page.waitForFunction((url: string) => document.URL.includes(url), {}, url)
          }
          page.waitForTimeout = async (ms: number) => {
            await new Promise((resolve) => setTimeout(resolve, ms))
          }
          await page.setViewport({ width: 1280, height: 800 })
          page.setDefaultNavigationTimeout(30000)
          page.setDefaultTimeout(30000)
          pages.push(page)
          return page
        }
      })

      this.tester.afterEach(async () => {
        await Promise.all(pages.map((page) => page.close()))
        pages = []
      })

      this.tester.afterAll(async () => {
        await Promise.all(browsers.map((browser) => browser.close()))
        browsers = []
      })

      tests({
        app,
        drivers,
        integrations,
        browser: browserPage,
      })
    })
  }

  private _prepare(): {
    app: App
    drivers: D extends (infer U)[]
      ? { [K in U & DriverType as Lowercase<K>]: WithDriverOutput<K> }
      : {}
    integrations: I extends (infer V)[]
      ? { [J in V & IntegrationType as Lowercase<J>]: WithIntegrationOutput<J> }
      : {}
  } {
    let files: string[] = []
    const drivers: any = {}
    const integrations: any = {}
    const extendsConfig: Partial<Config> = {}
    const app: App = {
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
      extendsConfig.services = {}
      if ('drivers' in this.options) {
        if (this.options.drivers.includes('Database')) {
          const config: DatabaseConfig = { type: 'SQLite', url: await getTestDbUrl('database') }
          const database = new DatabaseDriver(config)
          drivers.database = database
          extendsConfig.services.database = config
        }
        if (this.options.drivers.includes('Storage')) {
          if (!drivers.database) {
            throw new Error('Database must be initialized before Storage')
          }
          drivers.storage = new StorageDriver(drivers.database)
        }
        if (this.options.drivers.includes('Fetcher')) {
          const fetcher = new MockedFetcherDriver()
          drivers.fetcher = fetcher
        }
      }
      extendsConfig.integrations = {}
      if ('integrations' in this.options) {
        if (this.options.integrations.includes('Calendly')) {
          const configs: CalendlyConfig[] = [
            {
              account: 'calendly',
              baseUrl: await getTestDbUrl('calendly'),
              accessToken: 'test',
              clientId: 'test',
              clientSecret: 'test',
              authBaseUrl: await getTestDbUrl('calendly-auth'),
            },
          ]
          integrations.calendly = new CalendlyIntegration(configs[0])
          extendsConfig.integrations.calendly = configs
          await integrations.calendly.createToken(configs[0].accessToken)
        }
        if (this.options.integrations.includes('Notion')) {
          const configs: NotionConfig[] = [
            {
              account: 'notion',
              baseUrl: await getTestDbUrl('notion'),
              token: 'test',
              pollingInterval: 1,
            },
          ]
          integrations.notion = new NotionIntegration(configs[0])
          extendsConfig.integrations.notion = configs
          await integrations.notion.createToken(configs[0].token)
        }
        if (this.options.integrations.includes('Airtable')) {
          const configs: AirtableConfig[] = [
            {
              account: 'airtable',
              baseUrl: await getTestDbUrl('airtable'),
              apiKey: 'test',
              databaseId: 'test',
            },
          ]
          integrations.airtable = new AirtableIntegration(configs[0])
          extendsConfig.integrations.airtable = configs
          await integrations.airtable.createToken(configs[0].apiKey)
        }
        if (this.options.integrations.includes('Qonto')) {
          const configs: QontoConfig[] = [
            {
              account: 'qonto',
              baseUrl: await getTestDbUrl('qonto'),
              organisationSlug: 'test',
              secretKey: 'test',
            },
          ]
          integrations.qonto = new QontoIntegration(configs[0])
          extendsConfig.integrations.qonto = configs
          await integrations.qonto.createToken(configs[0].secretKey)
        }
        if (this.options.integrations.includes('GoogleMail')) {
          const configs: GoogleMailConfig[] = [
            {
              account: 'googlemail',
              baseUrl: await getTestDbUrl('googlemail'),
              user: 'test',
              password: 'test',
            },
          ]
          integrations.googleMail = new GoogleMailIntegration(configs[0])
          if (!extendsConfig.integrations.google) extendsConfig.integrations.google = {}
          extendsConfig.integrations.google.mail = configs
          await integrations.googleMail.createToken(configs[0].user)
        }
        if (this.options.integrations.includes('Pappers')) {
          const configs: PappersConfig[] = [
            {
              account: 'pappers',
              baseUrl: await getTestDbUrl('pappers'),
              apiKey: 'test',
            },
          ]
          integrations.pappers = new PappersIntegration(configs[0])
          extendsConfig.integrations.pappers = configs
          await integrations.pappers.createToken(configs[0].apiKey)
        }
        if (this.options.integrations.includes('GoCardless')) {
          const configs: GoCardlessConfig[] = [
            {
              account: 'gocardless',
              baseUrl: await getTestDbUrl('gocardless'),
              accessToken: 'test',
            },
          ]
          integrations.gocardless = new GoCardlessIntegration(configs[0])
          extendsConfig.integrations.gocardless = configs
          await integrations.gocardless.createToken(configs[0].accessToken)
        }
        if (this.options.integrations.includes('Phantombuster')) {
          const configs: PhantombusterConfig[] = [
            {
              account: 'phantombuster',
              baseUrl: await getTestDbUrl('phantombuster'),
              apiKey: 'test',
            },
          ]
          integrations.phantombuster = new PhantombusterIntegration(configs[0])
          extendsConfig.integrations.phantombuster = configs
          await integrations.phantombuster.createToken(configs[0].apiKey)
        }
        if (this.options.integrations.includes('YouCanBookMe')) {
          const configs: YouCanBookMeConfig[] = [
            {
              account: 'youcanbookme',
              baseUrl: await getTestDbUrl('youcanbookme'),
              username: 'test',
              password: 'test',
            },
          ]
          integrations.youcanbookme = new YouCanBookMeIntegration(configs[0])
          extendsConfig.integrations.youcanbookme = configs
          await integrations.youcanbookme.createToken(configs[0].username)
        }
        if (this.options.integrations.includes('Jotform')) {
          const configs: JotformConfig[] = [
            {
              account: 'jotform',
              baseUrl: await getTestDbUrl('jotform'),
              apiKey: 'test',
            },
          ]
          integrations.jotform = new JotformIntegration(configs[0])
          extendsConfig.integrations.jotform = configs
          await integrations.jotform.createToken(configs[0].apiKey)
        }
      }
      let startedApp: StartedApp | undefined
      app.start = async (config: Config) => {
        const options = { drivers: { fetcher: () => drivers.fetcher } }
        const { integrations, services, ...rest } = extendsConfig
        startedApp = await new MockedApp(options).start({
          ...config,
          ...rest,
          integrations: {
            ...config.integrations,
            ...integrations,
          },
          services: {
            loggers: [],
            theme: { type: 'none' },
            ...config.services,
            ...services,
          },
        })
        return startedApp
      }
      app.stop = async () => {
        if (startedApp) await startedApp.stop()
      }
    })

    this.tester.afterEach(async () => {
      await app.stop()
      for (const file of files) {
        if (await fs.exists(file)) await fs.unlink(file)
        if (await fs.exists(file.replace('.db', '.db-shm')))
          await fs.unlink(file.replace('.db', '.db-shm'))
        if (await fs.exists(file.replace('.db', '.db-wal')))
          await fs.unlink(file.replace('.db', '.db-wal'))
      }
      files = []
    })

    this.tester.afterAll(async () => {
      for (const file of files) {
        if (await fs.exists(file)) await fs.unlink(file)
        if (await fs.exists(file.replace('.db', '.db-shm')))
          await fs.unlink(file.replace('.db', '.db-shm'))
        if (await fs.exists(file.replace('.db', '.db-wal')))
          await fs.unlink(file.replace('.db', '.db-wal'))
      }
      files = []
    })

    return {
      drivers,
      integrations,
      app,
    }
  }
}

import { type FilterConfig, FilterMapper } from '/domain/entities/Filter'
import { CodeRunner } from './CodeRunner'
import type {
  ICodeRunnerSpi,
  CodeRunnerEntities,
  CodeRunnerIntegrations,
  CodeRunnerContextIntegrations,
  CodeRunnerContextServices,
  CodeRunnerContextServicesDatabase,
  CodeRunnerContextServicesLogger,
  CodeRunnerServices,
  CodeRunnerContextServicesFetcher,
} from './CodeRunner'
import type { RecordFields, UpdateRecordFields } from '/domain/entities/Record'

export type CodeCompilerServices = CodeRunnerServices

export type CodeCompilerEntities = CodeRunnerEntities

export type CodeCompilerIntegrations = CodeRunnerIntegrations

export interface ICodeCompilerSpi {
  compile: (code: string, env: { [key: string]: string }) => ICodeRunnerSpi
}

export interface CodeCompilerConfig {
  language: 'JavaScript' | 'TypeScript'
}

export class CodeCompiler {
  constructor(
    private _spi: ICodeCompilerSpi,
    private _services: CodeCompilerServices,
    private _entities: CodeCompilerEntities,
    private _integrations: CodeCompilerIntegrations
  ) {}

  compile = (code: string, env: { [key: string]: string }): CodeRunner => {
    const codeRunner = this._spi.compile(code, env)
    return new CodeRunner(codeRunner, this.getServices(), this.getIntegrations())
  }

  getServices = (): CodeRunnerContextServices => {
    const database: CodeRunnerContextServicesDatabase = {
      table: <T extends RecordFields>(name: string) => {
        const table = this._entities.tables.find((table) => table.name === name)
        if (!table) {
          throw new Error(`CodeRunner: Database table "${name}" not found`)
        }
        return {
          insert: async (data: T) => {
            return await table.db.insert<T>(data)
          },
          insertMany: async (data: T[]) => {
            return await table.db.insertMany<T>(data)
          },
          update: async (id: string, data: Partial<T>) => {
            return await table.db.update<T>(id, data)
          },
          updateMany: async (data: UpdateRecordFields<T>[]) => {
            return await table.db.updateMany<T>(data)
          },
          read: async (filterConfig: FilterConfig) => {
            const filter = FilterMapper.toEntity(filterConfig)
            return table.db.read<T>(filter)
          },
          readById: async (id: string) => {
            return table.db.readById<T>(id)
          },
          list: async (filterConfig?: FilterConfig) => {
            const filter = filterConfig && FilterMapper.toEntity(filterConfig)
            return await table.db.list<T>(filter)
          },
          exists: async () => {
            return table.db.exists()
          },
        }
      },
    }
    const logger: CodeRunnerContextServicesLogger = {
      error: (message: string, metadata?: object) => {
        this._services.logger.error(message, metadata)
      },
      info: (message: string, metadata?: object) => {
        this._services.logger.info(message, metadata)
      },
      debug: (message: string, metadata?: object) => {
        this._services.logger.debug(message, metadata)
      },
    }
    const fetcher: CodeRunnerContextServicesFetcher = {
      get: (url: string) => {
        return this._services.fetcher.get(url)
      },
      post: (url: string, body: object) => {
        return this._services.fetcher.post(url, body)
      },
    }
    return { database, logger, fetcher }
  }

  getIntegrations = (): CodeRunnerContextIntegrations => {
    const { notion, airtable, qonto, gocardless, pappers, phantombuster } = this._integrations
    return {
      notion: notion.codeRunnerIntegration,
      airtable: airtable.codeRunnerIntegration,
      qonto: qonto.codeRunnerIntegration,
      gocardless: gocardless.codeRunnerIntegration,
      pappers: pappers.codeRunnerIntegration,
      phantombuster: phantombuster.codeRunnerIntegration,
    }
  }
}

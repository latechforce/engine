import type { IAirtableIntegration } from '/adapter/spi/integrations/AirtableSpi'
import { AirtableTableIntegration } from './AirtableTableIntegration'
import type {
  AirtableBaseSchema,
  AirtableConfig,
  AirtableError,
  AirtableTableRecordFields,
} from '/domain/integrations/Airtable'
import Airtable from 'airtable'
import axios, { type AxiosInstance } from 'axios'
import type { IntegrationResponseError } from '/domain/integrations/base'
import { join } from 'path'

export class AirtableIntegration implements IAirtableIntegration {
  private _airtable: {
    base: Airtable.Base
    meta: AxiosInstance
  }

  constructor(public config: AirtableConfig) {
    const { apiKey, databaseId, baseUrl = 'https://api.airtable.com' } = config
    this._airtable = {
      base: new Airtable({ apiKey, endpointUrl: baseUrl }).base(databaseId),
      meta: axios.create({
        baseURL: join(baseUrl, 'v0', 'meta', 'bases', databaseId, 'tables'),
        headers: {
          Authorization: 'Bearer ' + apiKey,
          'Content-Type': 'application/json',
        },
      }),
    }
  }

  static isAirtableError(error: unknown): error is AirtableError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'statusCode' in error &&
      typeof error.statusCode === 'number' &&
      'message' in error &&
      typeof error.message === 'string'
    )
  }

  static responseError = (error: unknown): IntegrationResponseError => {
    if (AirtableIntegration.isAirtableError(error)) {
      const { statusCode, message } = error
      return {
        error: {
          status: statusCode,
          message,
        },
      }
    }
    throw error
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      await this._airtable.meta.get('/')
    } catch (error) {
      return AirtableIntegration.responseError(error)
    }
  }

  getTable = async <T extends AirtableTableRecordFields = AirtableTableRecordFields>(
    id: string
  ) => {
    const tablesSchema: AirtableBaseSchema = await this._airtable.meta
      .get('/')
      .then((res) => res.data)
    const schema = tablesSchema.tables.find((table) => table.id === id || table.name === id)
    if (!schema) {
      throw new Error(`Table with id "${id}" not found`)
    }
    return new AirtableTableIntegration<T>(this._airtable.base(id), schema)
  }
}

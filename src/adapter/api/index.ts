import { AppMapper } from './mappers/AppMapper'
import type { StoppedApp } from '/domain/entities/App/Stopped'
import type { Config } from '/domain/interfaces'
import type { SchemaError } from '/domain/entities/Error/Schema'
import type { Drivers } from '/adapter/spi/drivers'
import type { SchemaValidator } from '/domain/services/SchemaValidator'
import { SchemaValidatorMapper } from './mappers/Services/SchemaValidatorMapper'
import type { Integrations } from '/adapter/spi/integrations'
import type { StartedApp } from '/domain/entities/App/Started'
import type { Components } from '/domain/components'

export default class {
  private _schemaValidator: SchemaValidator

  constructor(
    private _drivers: Drivers,
    private _integrations: Integrations,
    private _components: Components,
    private _env: Record<string, string | undefined>
  ) {
    this._schemaValidator = SchemaValidatorMapper.toService(_drivers)
  }

  start = async (config: unknown): Promise<StartedApp> => {
    const stoppedApp = await this._validateOrThrow(config)
    await stoppedApp.init()
    const startedApp = await stoppedApp.start()
    return startedApp
  }

  private _getSchemaErrors = (config: unknown): SchemaError[] => {
    return this._schemaValidator.validateAppSchema(config)
  }

  private _isConfig = (config: unknown): config is Config => {
    return this._getSchemaErrors(config).length === 0
  }

  private _validateSchemaOrThrow = (config: unknown): Config => {
    if (!this._isConfig(config)) {
      const errors = this._schemaValidator.validateAppSchema(config)
      throw new Error(JSON.stringify(errors, null, 2))
    }
    return { ...config }
  }

  private _validateConfigOrThrow = async (config: Config): Promise<StoppedApp> => {
    const stoppedApp = AppMapper.toEntity(
      this._drivers,
      this._integrations,
      this._components,
      config
    )
    await stoppedApp.validate()
    return stoppedApp
  }

  private _validateOrThrow = async (config: unknown): Promise<StoppedApp> => {
    const configWithEnv = this._fillEnv(config)
    const configWithValidSchema = this._validateSchemaOrThrow(configWithEnv)
    return this._validateConfigOrThrow(configWithValidSchema)
  }

  private _fillEnv = (config: unknown): unknown => {
    if (Array.isArray(config)) {
      return config.map((item) => this._fillEnv(item))
    }

    if (typeof config !== 'object' || config === null) {
      return config
    }

    const result = { ...config } as unknown as Record<string, unknown>
    for (const [key, value] of Object.entries(config)) {
      if (typeof value === 'string' && value.match(/^{{\s*env\./)) {
        const content = value.replace(/^{{\s*env\.|}}$/g, '').trim()
        const [envKey, ...defaultValueParts] = content.split(' ')
        const defaultValue =
          defaultValueParts.length > 0
            ? defaultValueParts.join(' ').replace(/^"|"$/g, '')
            : undefined

        if (envKey in this._env) {
          result[key] = this._env[envKey]
        } else if (defaultValue !== undefined) {
          result[key] = defaultValue
        } else {
          throw new Error(`Environment variable ${envKey} not found and no default value provided`)
        }
      } else if (typeof value === 'object' && value !== null) {
        result[key] = this._fillEnv(value)
      } else {
        result[key] = value
      }
    }
    return result
  }
}

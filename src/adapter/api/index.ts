import { AppMapper } from './mappers/AppMapper'
import type { StoppedApp } from '/domain/entities/App/Stopped'
import type { ConfigSchema } from './schemas/ConfigSchema'
import type { SchemaError } from '/domain/entities/Error/Schema'
import type { Drivers } from '/adapter/spi/drivers'
import type { SchemaValidator } from '/domain/services/SchemaValidator'
import { SchemaValidatorMapper } from './mappers/Services/SchemaValidatorMapper'
import type { Integrations } from '/adapter/spi/integrations'
import type { StartedApp } from '/domain/entities/App/Started'
import type { Components } from '/domain/components'

export class Engine {
  private _schemaValidator: SchemaValidator

  constructor(
    private _drivers: Drivers,
    private _integrations: Integrations,
    private _components: Components
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
    return this._schemaValidator.validateConfigSchema(config)
  }

  private _isConfig = (config: unknown): config is ConfigSchema => {
    return this._getSchemaErrors(config).length === 0
  }

  private _validateSchemaOrThrow = (config: unknown): ConfigSchema => {
    if (!this._isConfig(config)) {
      const errors = this._schemaValidator.validateConfigSchema(config)
      throw new Error(JSON.stringify(errors, null, 2))
    }
    return { ...config }
  }

  private _validateConfigOrThrow = async (config: ConfigSchema): Promise<StoppedApp> => {
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
    const configWithEnv = Engine.fillEnv(config)
    const configWithValidSchema = this._validateSchemaOrThrow(configWithEnv)
    return this._validateConfigOrThrow(configWithValidSchema)
  }

  static fillEnv = (config: unknown): unknown => {
    const env = process.env

    function replaceToken(value: string): string {
      const content = value.replace(/^{{\s*env\.|}}$/g, '').trim()
      const [envKey, ...defaultValueParts] = content.split(' ')
      const defaultValue =
        defaultValueParts.length > 0 ? defaultValueParts.join(' ').replace(/^"|"$/g, '') : undefined
      if (envKey in env) {
        const envValue = env[envKey]
        if (envValue === undefined) {
          throw new Error(`Environment variable ${envKey} not found and no default value provided`)
        }
        return envValue
      } else if (defaultValue !== undefined) {
        return defaultValue
      }
      throw new Error(`Environment variable ${envKey} not found and no default value provided`)
    }

    if (Array.isArray(config)) {
      return config.map((item) => Engine.fillEnv(item))
    }

    if (typeof config !== 'object' || config === null) {
      if (typeof config === 'string' && config.match(/^{{\s*env\./)) {
        return replaceToken(config)
      }
      return config
    }

    const result = { ...config } as unknown as Record<string, unknown>
    for (const [key, value] of Object.entries(config)) {
      if (typeof value === 'string' && value.match(/^{{\s*env\./)) {
        result[key] = replaceToken(value)
      } else if (typeof value === 'object' && value !== null) {
        result[key] = Engine.fillEnv(value)
      } else {
        result[key] = value
      }
    }
    return result
  }
}

import { AppMapper } from './mappers/AppMapper'
import type { StoppedApp } from '/domain/entities/App/Stopped'
import type { Config } from '/domain/interfaces'
import type { SchemaError } from '/domain/entities/Error/Schema'
import type { Drivers } from '/adapter/spi/drivers'
import type { SchemaValidator } from '/domain/services/SchemaValidator'
import { SchemaValidatorMapper } from './mappers/Services/SchemaValidatorMapper'
import type { Integrations } from '/adapter/spi/integrations'
import type { StartedApp } from '/domain/entities/App/Started'
import type { Components } from '/adapter/spi/components'

export default class {
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
    await stoppedApp.logger.init()
    stoppedApp.logger.debug('✅ config schema is valid')
    const errors = await stoppedApp.validateConfig()
    if (errors.length > 0) throw new Error(JSON.stringify(errors, null, 2))
    stoppedApp.logger.debug('✅ config dependancies are valids')
    return stoppedApp
  }

  private _validateOrThrow = async (config: unknown): Promise<StoppedApp> => {
    const configWithValidSchema = this._validateSchemaOrThrow(config)
    return this._validateConfigOrThrow(configWithValidSchema)
  }
}

import TYPES from '../../../../shared/application/di/types'
import { injectable, inject } from 'inversify'
import type { IAppRepository } from '../../domain/repository-interface/app-repository.interface'
import type { ValidateResult } from '../../domain/value-object/validate-result.value-object'
import type { AppSchemaValidated } from '../../domain/schema/app.schema'

@injectable()
export class ValidateAppUseCase {
  constructor(
    @inject(TYPES.App.Repository)
    private readonly appRepository: IAppRepository
  ) {}

  async execute(unknownSchema: unknown): Promise<ValidateResult> {
    const result = this.appRepository.validate(unknownSchema)
    if (result.schema) {
      try {
        result.schema = this.fillEnv(result.schema) as AppSchemaValidated
      } catch (error) {
        return {
          schema: undefined,
          error: error instanceof Error ? error.message : 'Unknown error',
        }
      }
    }
    return result
  }

  private fillEnv(config: unknown): unknown {
    const env = Bun.env

    function replaceToken(value: string): string {
      const content = value.replace(/^{{\s*env\.|}}$/g, '').trim()
      const [envKey, ...defaultValueParts] = content.split(' ')
      const defaultValue =
        defaultValueParts.length > 0 ? defaultValueParts.join(' ').replace(/^"|"$/g, '') : undefined
      if (envKey && envKey in env) {
        const envValue = env[envKey]
        if (envValue === undefined) {
          throw new Error(
            `Environment variable "${envKey}" not found and no default value provided`
          )
        }
        return envValue
      } else if (defaultValue !== undefined) {
        return defaultValue
      }
      throw new Error(`Environment variable "${envKey}" not found and no default value provided`)
    }

    if (Array.isArray(config)) {
      return config.map((item) => this.fillEnv(item))
    }

    if (typeof config !== 'object' || config === null) {
      if (typeof config === 'string' && config.match(/^{{\s*env\./)) {
        return replaceToken(config)
      }
      return config
    }

    const result = { ...config } as Record<string, unknown>
    for (const [key, value] of Object.entries(config)) {
      if (typeof value === 'string' && value.match(/^{{\s*env\./)) {
        result[key] = replaceToken(value)
      } else if (typeof value === 'object' && value !== null) {
        result[key] = this.fillEnv(value)
      } else {
        result[key] = value
      }
    }
    return result
  }
}

import Ajv from 'ajv'
import fs from 'fs-extra'
import { join } from 'path'
import type { JSONSchemaType, ValidateFunction } from 'ajv'
import type { IJsonValidator } from '@domain/drivers/jsonValidator/IJsonValidator'
import type { IApp } from '@domain/entities/app/IApp'
import { AppError } from '@domain/entities/app/AppError'

const schemaPath = join(process.cwd(), 'schemas/')

class JsonValidator implements IJsonValidator {
  private validateApp: ValidateFunction<IApp>

  constructor() {
    const ajv = new Ajv({ allErrors: true })
    const appSchema: JSONSchemaType<IApp> = fs.readJSONSync(join(schemaPath, 'app.schema.json'))
    this.validateApp = ajv.compile(appSchema)
  }

  validateAppConfig(json: unknown) {
    if (this.validateApp(json)) {
      return { json }
    } else if (this.validateApp.errors) {
      const errors = this.validateApp.errors.map((error) => {
        const { keyword, params, message } = error
        if (keyword === 'required') {
          if (params.missingProperty === 'name') return new AppError('NAME_REQUIRED')
          if (params.missingProperty === 'roles') return new AppError('ROLES_REQUIRED')
          if (params.missingProperty === 'features') return new AppError('FEATURES_REQUIRED')
        }
        throw new Error('Unknown AJV error: ' + message)
      })
      return { errors }
    } else {
      return { errors: [] }
    }
  }
}

export default new JsonValidator()

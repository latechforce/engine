import { z } from 'zod'
import type { JSONSchema7 } from 'json-schema'
import { validatorService } from '../service/validator.service'

export const jsonSchemaValidator = z.custom<JSONSchema7>(
  (value) => {
    return validatorService.validateMetaSchema(value)
  },
  {
    message: 'Invalid JSON Schema',
  }
)

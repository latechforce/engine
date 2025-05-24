import type { AppSchemaValidated } from '@/domain/validator/app.validator'

export type ValidateResult =
  | { schema: AppSchemaValidated; error?: undefined }
  | { schema?: undefined; error: string }

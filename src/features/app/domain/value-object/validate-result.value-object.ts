import type { AppSchemaValidated } from '../schema/app.schema'

export type ValidateResult =
  | { schema: AppSchemaValidated; error?: undefined }
  | { schema?: undefined; error: string }

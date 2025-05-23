import type { AppSchemaValidated } from '@/types'

export type ValidateResult =
  | { schema: AppSchemaValidated; error?: undefined }
  | { schema?: undefined; error: string }

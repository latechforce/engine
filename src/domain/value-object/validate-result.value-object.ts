import type { AppSchemaValidated } from '@/types'

export type ValidateResult =
  | { appSchema: AppSchemaValidated; error?: undefined }
  | { appSchema?: undefined; error: string }

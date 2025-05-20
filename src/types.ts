import type { AppSchema as AppSchemaValidated } from '@/infrastructure/validator/app.validator'
export type { ActionSchema } from '@/infrastructure/validator/action'
export type { AutomationSchema } from '@/infrastructure/validator/automation.validator'
export type { TriggerSchema } from '@/infrastructure/validator/trigger'
export type { CodeContext } from '@/infrastructure/service/code.service'
export type { EnvSchema } from '@/infrastructure/validator/env.validator'
export type { FieldSchema } from '@/infrastructure/validator/field'
export type { TableSchema } from '@/infrastructure/validator/table.validator'
export type { ResponseHttpActionSchema } from '@/infrastructure/validator/action/http/response.validator'

export type AppSchema = Partial<AppSchemaValidated>

export type { AppSchemaValidated }

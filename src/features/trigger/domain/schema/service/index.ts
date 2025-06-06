import { z } from 'zod/v4'
import { httpTriggerSchema } from './http'
import { databaseTriggerSchema } from './database'

export const serviceTriggerSchema = z.union([httpTriggerSchema, databaseTriggerSchema])

export type ServiceTriggerSchema = z.infer<typeof serviceTriggerSchema>

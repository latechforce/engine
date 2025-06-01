import { z } from 'zod/v4'
import { httpTriggerSchema } from './http'

export const serviceTriggerSchema = z.union([httpTriggerSchema])

export type ServiceTriggerSchema = z.infer<typeof serviceTriggerSchema>

import { z } from 'zod/v4'
import { httpTriggerValidator } from './http'

export const serviceTriggerValidator = z.union([httpTriggerValidator])

export type ServiceTriggerSchema = z.infer<typeof serviceTriggerValidator>

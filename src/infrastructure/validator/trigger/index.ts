import { z } from 'zod'
import { httpTriggerValidator } from './http'

export const triggerValidator = httpTriggerValidator

export type TriggerSchema = z.infer<typeof triggerValidator>

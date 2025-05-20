import { z } from 'zod'
import { postHttpTriggerValidator } from './post.validator'
import { getHttpTriggerValidator } from './get.validator'

export const httpTriggerValidator = z.union([postHttpTriggerValidator, getHttpTriggerValidator])

export type HttpTriggerSchema = z.infer<typeof httpTriggerValidator>

import { z } from 'zod'
import { responseHttpActionValidator } from './response.validator'

export const httpActionValidator = responseHttpActionValidator

export type HttpActionSchema = z.infer<typeof httpActionValidator>

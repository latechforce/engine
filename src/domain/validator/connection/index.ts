import { z } from 'zod/v4'
import { calendlyConnectionValidator } from './calendly.validator'
import { googleSheetsConnectionValidator } from './google-sheets.validator'

export const connectionValidator = z
  .union([calendlyConnectionValidator, googleSheetsConnectionValidator])
  .meta({
    title: 'Connection',
    description: 'The connection is a connection to an external service',
  })

export type ConnectionSchema = z.infer<typeof connectionValidator>

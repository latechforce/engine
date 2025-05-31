// Third-party imports
import { z } from 'zod/v4'

// Action domain imports
import { calendlyActionSchema } from './calendly'
import { googleSheetsActionSchema } from './google/sheets'

export const integrationActionSchema = z.union([calendlyActionSchema, googleSheetsActionSchema])

export type IntegrationActionSchema = z.infer<typeof integrationActionSchema>

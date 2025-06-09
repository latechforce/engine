// Third-party imports
import { z } from 'zod/v4'

// Action domain imports
import { calendlyActionSchema } from './calendly'
import { googleSheetsActionSchema } from './google/sheets'
import { googleGmailActionSchema } from './google/gmail'

export const integrationActionSchema = z.union([
  calendlyActionSchema,
  googleSheetsActionSchema,
  googleGmailActionSchema,
])

export type IntegrationActionSchema = z.infer<typeof integrationActionSchema>

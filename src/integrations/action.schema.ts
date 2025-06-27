import { z } from 'zod/v4'
import { calendlyActionSchema } from './calendly/calendly-action.schema'
import { googleSheetsActionSchema } from './google/sheets/google-sheets-action.schema'
import { googleGmailActionSchema } from './google/gmail/google-gmail-action.schema'
import { airtableActionSchema } from './airtable/airtable-action.schema'

export const integrationActionSchema = z.union([
  calendlyActionSchema,
  airtableActionSchema,
  googleSheetsActionSchema,
  googleGmailActionSchema,
])

export type IntegrationActionSchema = z.infer<typeof integrationActionSchema>

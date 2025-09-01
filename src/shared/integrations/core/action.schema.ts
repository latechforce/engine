import { z } from 'zod/v4'
import { calendlyActionSchema } from '../productivity/calendly/calendly-action.schema'
import { googleSheetsActionSchema } from '../communication/google/sheets/google-sheets-action.schema'
import { googleGmailActionSchema } from '../communication/google/gmail/google-gmail-action.schema'
import { airtableActionSchema } from '../productivity/airtable/airtable-action.schema'
import { linkedinAdsActionSchema } from '../social/linkedin/ads/linkedin-ads-action.schema'
import { facebookActionSchema } from '../social/facebook/ads/facebook-ads-action.schema'
import { notionActionSchema } from '../productivity/notion/notion-action.schema'
import { qontoActionSchema } from '../financial/qonto/qonto-action.schema'

export const integrationActionSchema = z.union([
  calendlyActionSchema,
  airtableActionSchema,
  googleSheetsActionSchema,
  googleGmailActionSchema,
  linkedinAdsActionSchema,
  facebookActionSchema,
  notionActionSchema,
  qontoActionSchema,
])

export type IntegrationActionSchema = z.infer<typeof integrationActionSchema>

import { z } from 'zod/v4'
import { oauthConnectionSchema } from '../../features/connection/domain/schema/oauth'

export const googleGmailConnectionSchema = oauthConnectionSchema
  .extend({
    service: z.literal('google-gmail'),
  })
  .meta({
    title: 'Google Gmail',
    description: 'The Google Gmail connection is a connection to the Google Gmail API',
  })

export const googleSheetsConnectionSchema = oauthConnectionSchema
  .extend({
    service: z.literal('google-sheets'),
  })
  .meta({
    title: 'Google Sheets',
    description: 'The Google Sheets connection is a connection to the Google Sheets API',
  })

export const googleConnectionSchema = z.union([
  googleGmailConnectionSchema,
  googleSheetsConnectionSchema,
])

export type GoogleConnectionSchema = z.infer<typeof googleConnectionSchema>

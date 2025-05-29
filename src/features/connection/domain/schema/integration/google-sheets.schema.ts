import { z } from 'zod/v4'
import { baseConnectionValidator } from '../base'

export const googleSheetsConnectionValidator = baseConnectionValidator
  .extend({
    service: z.literal('google-sheets'),
  })
  .meta({
    title: 'Google Sheets',
    description: 'The Google Sheets connection is a connection to the Google Sheets API',
  })

export type GoogleConnectionSchema = z.infer<typeof googleSheetsConnectionValidator>

import { z } from 'zod/v4'
import { sendEmailGoogleGmailActionSchema } from './send-email.schema'

export const googleGmailActionSchema = z.union([sendEmailGoogleGmailActionSchema]).meta({
  title: 'Google Gmail',
  description:
    'The Google Gmail action is a action that is used to interact with the Google Gmail API',
})

export type GoogleGmailActionSchema = z.infer<typeof googleGmailActionSchema>

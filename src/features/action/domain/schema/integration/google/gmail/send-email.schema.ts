import { z } from 'zod/v4'
import { baseGoogleGmailActionSchema } from './base'

export const sendEmailGoogleGmailActionSchema = baseGoogleGmailActionSchema
  .extend({
    action: z.literal('send-email'),
    sendEmailGoogleGmail: z.object({
      to: z.string(),
      subject: z.string(),
      html: z.string(),
    }),
  })
  .meta({
    title: 'Send an email',
    description: 'The Google Gmail send email action is a action that sends an email',
  })

export type SendEmailGoogleGmailActionSchema = z.infer<typeof sendEmailGoogleGmailActionSchema>

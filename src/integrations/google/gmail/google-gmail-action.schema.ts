import { z } from 'zod/v4'
import { baseIntegrationActionSchema } from '../../../features/action/domain/schema/base.integration'

const baseGoogleGmailActionSchema = baseIntegrationActionSchema.extend({
  service: z.literal('google-gmail'),
})

const sendEmailGoogleGmailActionSchema = baseGoogleGmailActionSchema
  .extend({
    action: z.literal('send-email'),
    params: z.object({
      from: z.email().optional(),
      name: z.string().optional(),
      to: z.email().or(z.array(z.email())),
      cc: z.email().or(z.array(z.email())).optional(),
      bcc: z.email().or(z.array(z.email())).optional(),
      subject: z.string(),
      html: z.string(),
      text: z.string().optional(),
    }),
  })
  .meta({
    title: 'Send an email',
    description: 'The Google Gmail send email action is a action that sends an email',
  })

export const googleGmailActionSchema = z.union([sendEmailGoogleGmailActionSchema]).meta({
  title: 'Google Gmail',
  description:
    'The Google Gmail action is a action that is used to interact with the Google Gmail API',
})

export type GoogleGmailActionSchema = z.infer<typeof googleGmailActionSchema>

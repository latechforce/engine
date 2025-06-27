import { z } from 'zod/v4'
import { baseIntegrationActionSchema } from '../../features/action/domain/schema/base.integration'

const baseAirtableActionSchema = baseIntegrationActionSchema.extend({
  service: z.literal('airtable'),
})

const listWebhookPayloadsAirtableActionSchema = baseAirtableActionSchema
  .extend({
    action: z.literal('list-webhook-payloads'),
    params: z.object({
      baseId: z.string(),
      webhookId: z.string(),
    }),
  })
  .meta({
    title: 'List Webhook Subscriptions',
    description:
      'The Calendly list webhook subscriptions action is a action that lists the webhook subscriptions for a given organization',
  })

export const airtableActionSchema = z.union([listWebhookPayloadsAirtableActionSchema]).meta({
  title: 'Airtable',
  description: 'The Airtable action is a action that is used to interact with the Airtable API',
})

export type AirtableActionSchema = z.infer<typeof airtableActionSchema>

import { z } from 'zod/v4'
import { listWebhookSubscriptionsCalendlyActionSchema } from './list-webhook-subscriptions.schema'

export const calendlyActionSchema = z.union([listWebhookSubscriptionsCalendlyActionSchema]).meta({
  title: 'Calendly',
  description: 'The Calendly action is a action that is used to interact with the Calendly API',
})

export type CalendlyActionSchema = z.infer<typeof calendlyActionSchema>

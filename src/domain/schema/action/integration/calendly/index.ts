import { z } from 'zod/v4'
import { listWebhookSubscriptionsCalendlyActionValidator } from './list-webhook-subscriptions.schema'

export const calendlyActionValidator = z
  .union([listWebhookSubscriptionsCalendlyActionValidator])
  .meta({
    title: 'Calendly',
    description: 'The Calendly action is a action that is used to interact with the Calendly API',
  })

export type CalendlyActionSchema = z.infer<typeof calendlyActionValidator>

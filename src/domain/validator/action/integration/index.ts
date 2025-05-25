import { z } from 'zod/v4'
import { listWebhookSubscriptionsCalendlyActionValidator } from './calendly/list-webhook-subscriptions.validator'

export const integrationActionValidator = z.union([listWebhookSubscriptionsCalendlyActionValidator])

export type IntegrationActionSchema = z.infer<typeof integrationActionValidator>

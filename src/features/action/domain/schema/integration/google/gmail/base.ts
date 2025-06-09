import { z } from 'zod/v4'
import { baseIntegrationActionSchema } from '../../base'

export const baseGoogleGmailActionSchema = baseIntegrationActionSchema.extend({
  service: z.literal('google-gmail'),
})

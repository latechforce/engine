import { z } from 'zod/v4'
import { baseIntegrationActionSchema } from '../../base'

export const baseGoogleSheetsActionSchema = baseIntegrationActionSchema.extend({
  service: z.literal('google-sheets'),
})

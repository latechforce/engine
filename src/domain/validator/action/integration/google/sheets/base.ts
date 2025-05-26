import { z } from 'zod/v4'
import { baseIntegrationActionValidator } from '../../base'

export const baseGoogleSheetsActionValidator = baseIntegrationActionValidator.extend({
  service: z.literal('google-sheets'),
})

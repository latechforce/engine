import { z } from 'zod/v4'
import { calendlyActionValidator } from './calendly'
import { googleSheetsActionValidator } from './google/sheets'

export const integrationActionValidator = z.union([
  calendlyActionValidator,
  googleSheetsActionValidator,
])

export type IntegrationActionSchema = z.infer<typeof integrationActionValidator>

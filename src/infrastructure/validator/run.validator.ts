import { z } from 'zod/v4'
import { automationValidator } from './automation.validator'

export const runValidator = z.object({
  id: z.string(),
  status: z.enum(['playing', 'success', 'stopped']),
  created_at: z.string(),
  updated_at: z.string(),
  automation_schema: automationValidator,
  data: z.record(z.string(), z.any()),
  last_action_name: z.string().nullable(),
  error_message: z.string().nullable(),
})

export type RunSchema = z.infer<typeof runValidator>

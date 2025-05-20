import { z } from 'zod'
import { triggerValidator } from './trigger'
import { actionValidator } from './action'

export const automationValidator = z
  .object({
    name: z.string().trim().min(3),
    trigger: triggerValidator,
    actions: z.array(actionValidator).default([]),
  })
  .strict()

export type AutomationSchema = z.infer<typeof automationValidator>

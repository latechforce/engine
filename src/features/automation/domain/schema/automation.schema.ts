import { z } from 'zod/v4'
import { triggerValidator } from '@/trigger/domain/schema/trigger.schema'
import { actionValidator } from '@/action/domain/schema/action.schema'

export const automationValidator = z
  .object({
    name: z.string().trim().min(3),
    trigger: triggerValidator,
    actions: z.array(actionValidator).default([]),
  })
  .strict()
  .meta({
    title: 'Automation',
    description: 'The automation is a set of actions that are triggered by a trigger',
  })

export type AutomationSchema = z.infer<typeof automationValidator>

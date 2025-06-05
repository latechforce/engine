// Third-party imports
import { z } from 'zod/v4'

// Action domain imports
import { actionSchema } from '../../../action/domain/schema/action.schema'

// Trigger domain imports
import { triggerSchema } from '../../../trigger/domain/schema/trigger.schema'

export const automationSchema = z
  .object({
    id: z.number().int().positive(),
    name: z.string().trim().min(3),
    trigger: triggerSchema,
    actions: z.array(actionSchema).default([]),
  })
  .strict()
  .meta({
    title: 'Automation',
    description: 'The automation is a set of actions that are triggered by a trigger',
  })

export type AutomationSchema = z.infer<typeof automationSchema>

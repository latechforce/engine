import { z } from 'zod/v4'
import { baseScheduleTriggerSchema } from './base'

export const cronTimeScheduleTriggerSchema = baseScheduleTriggerSchema
  .extend({
    event: z.literal('cron-time'),
    params: z.object({
      expression: z.string(),
      timeZone: z.string(),
    }),
  })
  .meta({
    title: 'Cron Time',
    description: 'The Cron Time trigger is a trigger that is triggered by a cron time',
  })

export type CronTimeScheduleTriggerSchema = z.infer<typeof cronTimeScheduleTriggerSchema>

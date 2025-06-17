import { z } from 'zod/v4'
import { cronTimeScheduleTriggerSchema } from './cron-time.schema'

export const scheduleTriggerSchema = z.union([cronTimeScheduleTriggerSchema]).meta({
  title: 'Schedule',
  description: 'The Schedule trigger is a trigger that is triggered by a schedule event',
})

export type ScheduleTriggerSchema = z.infer<typeof scheduleTriggerSchema>

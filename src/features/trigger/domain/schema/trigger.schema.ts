import { z } from 'zod/v4'
import { httpTriggerSchema } from './http'
import { databaseTriggerSchema } from './database'
import { scheduleTriggerSchema } from './schedule'
import { integrationTriggerSchema } from '../../../../integrations/trigger.schema'

export const triggerSchema = z
  .union([
    httpTriggerSchema,
    databaseTriggerSchema,
    scheduleTriggerSchema,
    integrationTriggerSchema,
  ])
  .meta({
    title: 'Trigger',
    description: 'The trigger is the event that triggers the automation',
  })

export type TriggerSchema = z.infer<typeof triggerSchema>

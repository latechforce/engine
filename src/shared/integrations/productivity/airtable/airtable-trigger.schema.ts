import { z } from 'zod/v4'

import { baseIntegrationTriggerSchema } from '../../../../features/trigger/domain/schema/base.integration'

export const baseAirtableTriggerSchema = baseIntegrationTriggerSchema.extend({
  service: z.literal('airtable'),
})

export const recordCreatedAirtableTriggerSchema = baseAirtableTriggerSchema
  .extend({
    event: z.literal('record-created'),
    params: z.object({
      baseId: z.string(),
      tableId: z.string(),
    }),
  })
  .meta({
    title: 'Invite Created',
    description:
      'The Calendly invite created trigger is a trigger that is triggered by a invite created event',
  })

export const airtableTriggerSchema = z.union([recordCreatedAirtableTriggerSchema]).meta({
  title: 'Airtable',
  description: 'The Airtable trigger is a trigger that is triggered by a Airtable event',
})

export type AirtableTriggerSchema = z.infer<typeof airtableTriggerSchema>

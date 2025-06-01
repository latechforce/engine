import { z } from 'zod/v4'
import { baseFilterActionSchema } from './base'
import { conditionSchema } from '../../condition'

export const onlyContinueIfFilterActionSchema = baseFilterActionSchema
  .extend({
    action: z.literal('only-continue-if'),
    conditions: z.array(conditionSchema),
  })
  .meta({
    title: 'Only continue if',
    description:
      'The Only continue if filter action is an action that is performed by the automation',
  })

export type OnlyContinueIfFilterActionSchema = z.infer<typeof onlyContinueIfFilterActionSchema>

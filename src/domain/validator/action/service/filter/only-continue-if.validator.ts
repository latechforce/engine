import { z } from 'zod/v4'
import { baseFilterActionValidator } from './base'

export const onlyContinueIfFilterActionValidator = baseFilterActionValidator
  .extend({
    action: z.literal('only-continue-if'),
    conditions: z.array(
      z.object({
        input: z.string(),
        operator: z.enum(['is-not-empty']),
      })
    ),
  })
  .meta({
    title: 'Only continue if',
    description:
      'The Only continue if filter action is an action that is performed by the automation',
  })

export type OnlyContinueIfFilterActionSchema = z.infer<typeof onlyContinueIfFilterActionValidator>

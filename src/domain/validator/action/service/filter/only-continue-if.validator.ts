import { z } from 'zod/v4'
import { baseFilterActionValidator } from './base'
import { conditionValidator } from '@/domain/validator/condition'

export const onlyContinueIfFilterActionValidator = baseFilterActionValidator
  .extend({
    action: z.literal('only-continue-if'),
    conditions: z.array(conditionValidator),
  })
  .meta({
    title: 'Only continue if',
    description:
      'The Only continue if filter action is an action that is performed by the automation',
  })

export type OnlyContinueIfFilterActionSchema = z.infer<typeof onlyContinueIfFilterActionValidator>

import { z } from 'zod/v4'
import { basePathsActionValidator } from './base'
import { actionValidator, type ActionSchema } from '../../action.schema'
import { conditionValidator, type ConditionSchema } from '../../condition'

type SplitIntoPathsPathsAction = {
  name: string
  service: 'paths'
  action: 'split-into-paths'
  paths: {
    name: string
    conditions: ConditionSchema[]
    actions: ActionSchema[]
  }[]
}

export const splitIntoPathsPathsActionValidator: z.ZodType<SplitIntoPathsPathsAction> = z.lazy(() =>
  basePathsActionValidator
    .extend({
      action: z.literal('split-into-paths'),
      paths: z.array(
        z.object({
          name: z.string(),
          conditions: z.array(conditionValidator),
          actions: z.array(actionValidator),
        })
      ),
    })
    .meta({
      title: 'Split into paths',
      description:
        'The Split into paths paths action is an action that is performed by the automation',
    })
)

export type SplitIntoPathsPathsActionSchema = z.infer<typeof splitIntoPathsPathsActionValidator>

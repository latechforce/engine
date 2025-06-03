import { z } from 'zod/v4'
import { basePathsActionSchema } from './base'
import { actionSchema, type ActionSchema } from '../../action.schema'
import { conditionsSchema, type ConditionsSchema } from '../../condition'

type SplitIntoPathsPathsAction = {
  name: string
  service: 'paths'
  action: 'split-into-paths'
  paths: {
    name: string
    conditions: ConditionsSchema
    actions: ActionSchema[]
  }[]
}

export const splitIntoPathsPathsActionSchema: z.ZodType<SplitIntoPathsPathsAction> = z.lazy(() =>
  basePathsActionSchema
    .extend({
      action: z.literal('split-into-paths'),
      paths: z.array(
        z.object({
          name: z.string(),
          conditions: conditionsSchema,
          actions: z.array(actionSchema),
        })
      ),
    })
    .meta({
      title: 'Split into paths',
      description:
        'The Split into paths paths action is an action that is performed by the automation',
    })
)

export type SplitIntoPathsPathsActionSchema = z.infer<typeof splitIntoPathsPathsActionSchema>

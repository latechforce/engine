import { z } from 'zod/v4'
import { baseFilterActionSchema } from './base'
import { actionSchema, type ActionSchema } from '../action.schema'
import { conditionsSchema, type ConditionsSchema } from '../condition'

export type PathSchema = {
  name: string
  filter: ConditionsSchema
  actions: ActionSchema[]
}

export type SplitIntoPathsFilterActionSchema = {
  name: string
  service: 'filter'
  action: 'split-into-paths'
  params: PathSchema[]
}

export const splitIntoPathsFilterActionSchema: z.ZodType<SplitIntoPathsFilterActionSchema> = z.lazy(
  () =>
    baseFilterActionSchema
      .extend({
        action: z.literal('split-into-paths'),
        params: z.array(
          z.object({
            name: z.string(),
            filter: conditionsSchema,
            actions: z.array(actionSchema),
          })
        ),
      })
      .meta({
        title: 'Split into paths',
        description:
          'The Split into paths filter action is an action that is performed by the automation',
      })
)

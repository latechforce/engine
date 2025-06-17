import { z } from 'zod/v4'
import { baseFilterActionSchema } from './base'
import { actionSchema, type ActionSchema } from '../action.schema'
import { conditionsSchema, type ConditionsSchema } from '../condition'

type PathSchema = {
  name: string
  onlyContinueIf: ConditionsSchema
  actions: ActionSchema[]
}

export type SplitIntoPathsFilterActionSchema = {
  name: string
  service: 'filter'
  action: 'split-into-paths'
  splitIntoPathsFilter: PathSchema[]
}

export const splitIntoPathsFilterActionSchema: z.ZodType<SplitIntoPathsFilterActionSchema> = z.lazy(
  () =>
    baseFilterActionSchema
      .extend({
        action: z.literal('split-into-paths'),
        splitIntoPathsFilter: z.array(
          z.object({
            name: z.string(),
            onlyContinueIf: conditionsSchema,
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

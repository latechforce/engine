import { z } from 'zod/v4'
import { onlyContinueIfFilterActionSchema } from './only-continue-if.schema'
import { splitIntoPathsFilterActionSchema } from './split-into-paths.schema'

export const filterActionSchema = z
  .union([onlyContinueIfFilterActionSchema, splitIntoPathsFilterActionSchema])
  .meta({
    title: 'Filter',
    description: 'The Filter action is an action that is performed by the automation',
  })

export type FilterActionSchema = z.infer<typeof filterActionSchema>

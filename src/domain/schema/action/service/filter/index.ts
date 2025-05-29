import { z } from 'zod/v4'
import { onlyContinueIfFilterActionValidator } from './only-continue-if.schema'

export const filterActionValidator = z.union([onlyContinueIfFilterActionValidator]).meta({
  title: 'Filter',
  description: 'The Filter action is an action that is performed by the automation',
})

export type FilterActionSchema = z.infer<typeof filterActionValidator>

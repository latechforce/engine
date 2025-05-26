import { z } from 'zod/v4'
import { splitIntoPathsPathsActionValidator } from './split-into-paths.validator'

export const pathsActionValidator = z.union([splitIntoPathsPathsActionValidator]).meta({
  title: 'Paths',
  description: 'The Paths action is an action that is performed by the automation',
})

export type PathsActionSchema = z.infer<typeof pathsActionValidator>

import { z } from 'zod/v4'
import { splitIntoPathsPathsActionSchema } from './split-into-paths.schema'

export const pathsActionSchema = z.union([splitIntoPathsPathsActionSchema]).meta({
  title: 'Paths',
  description: 'The Paths action is an action that is performed by the automation',
})

export type PathsActionSchema = z.infer<typeof pathsActionSchema>

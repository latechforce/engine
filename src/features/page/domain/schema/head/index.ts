import { metaHeadElementSchema } from './meta.schema'
import { titleElementSchema } from './title.schema'
import { z } from 'zod/v4'

export const headElementSchema = z.union([metaHeadElementSchema, titleElementSchema])

export type HeadElementSchema = z.infer<typeof headElementSchema>

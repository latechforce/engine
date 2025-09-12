import { metaHeadElementSchema } from './meta.schema'
import { titleElementSchema } from './title.schema'
import { scriptElementSchema } from './script.schema'
import { styleElementSchema } from './style.schema'
import { linkElementSchema } from './link.schema'
import { z } from 'zod/v4'

export const headElementSchema = z.union([
  metaHeadElementSchema,
  titleElementSchema,
  scriptElementSchema,
  styleElementSchema,
  linkElementSchema,
])

export type HeadElementSchema = z.infer<typeof headElementSchema>

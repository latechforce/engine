import { z } from 'zod/v4'
import { customHtmlBodyElementSchema } from './custom-html.schema'

export const bodyElementSchema = z.union([customHtmlBodyElementSchema])

export type BodyElementSchema = z.infer<typeof bodyElementSchema>

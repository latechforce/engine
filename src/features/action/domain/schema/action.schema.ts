import { z } from 'zod/v4'
import { codeActionSchema } from './service/code'
import { httpActionSchema } from './service/http'
import { calendlyActionSchema } from './integration/calendly'
import { googleSheetsActionSchema } from './integration/google/sheets'
import { filterActionSchema } from './service/filter'
import { pathsActionSchema } from './service/paths'

export const actionSchema = z
  .union([
    codeActionSchema,
    httpActionSchema,
    filterActionSchema,
    calendlyActionSchema,
    googleSheetsActionSchema,
    pathsActionSchema,
  ])
  .meta({
    title: 'Action',
    description: 'The action is an action that is performed by the automation',
  })

export type ActionSchema = z.infer<typeof actionSchema>

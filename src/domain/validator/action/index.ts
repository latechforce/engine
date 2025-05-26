import { z } from 'zod/v4'
import { codeActionValidator } from './service/code'
import { httpActionValidator } from './service/http'
import { calendlyActionValidator } from './integration/calendly'
import { googleSheetsActionValidator } from './integration/google/sheets'

export const actionValidator = z
  .union([
    codeActionValidator,
    httpActionValidator,
    calendlyActionValidator,
    googleSheetsActionValidator,
  ])
  .meta({
    title: 'Action',
    description: 'The action is an action that is performed by the automation',
  })

export type ActionSchema = z.infer<typeof actionValidator>

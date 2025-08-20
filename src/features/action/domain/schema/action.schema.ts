import { z } from 'zod/v4'
import { httpActionSchema } from './http'
import { codeActionSchema } from './code'
import { filterActionSchema } from './filter'
import { databaseActionSchema } from './database'
import { integrationActionSchema } from '../../../../shared/integrations/core/action.schema'

export const actionSchema = z
  .union([
    httpActionSchema,
    codeActionSchema,
    filterActionSchema,
    integrationActionSchema,
    databaseActionSchema,
  ])
  .meta({
    title: 'Action',
    description: 'The action is an action that is performed by the automation',
  })

export type ActionSchema = z.infer<typeof actionSchema>

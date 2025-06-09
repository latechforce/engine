import { z } from 'zod/v4'
import { integrationActionSchema } from './integration'
import { serviceActionSchema } from './service'

export const actionSchema = z.union([integrationActionSchema, serviceActionSchema]).meta({
  title: 'Action',
  description: 'The action is an action that is performed by the automation',
})

export type ActionSchema = z.infer<typeof actionSchema>

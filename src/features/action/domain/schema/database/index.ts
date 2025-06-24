import { z } from 'zod/v4'
import { createRecordActionSchema } from './create-record'

export const databaseActionSchema = z.union([createRecordActionSchema]).meta({
  title: 'Database',
  description: 'The Database action is an action that is performed by the automation',
})

export type DatabaseActionSchema = z.infer<typeof databaseActionSchema>

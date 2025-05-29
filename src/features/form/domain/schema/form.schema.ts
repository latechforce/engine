import { z } from 'zod/v4'
import { inputValidator } from '@/form/domain/schema/input'

export const formValidator = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    path: z.string(),
    action: z.string(),
    inputs: z.array(inputValidator).default([]),
  })
  .meta({
    title: 'Form',
    description: 'The form is a collection of inputs',
  })

export type FormSchema = z.infer<typeof formValidator>

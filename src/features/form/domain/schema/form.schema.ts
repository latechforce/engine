// Third-party imports
import { z } from 'zod/v4'

// Form domain imports
import { inputSchema } from '@/form/domain/schema/input'

export const formSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    path: z.string(),
    action: z.string(),
    inputs: z.array(inputSchema).default([]),
  })
  .meta({
    title: 'Form',
    description: 'The form is a collection of inputs',
  })

export type FormSchema = z.infer<typeof formSchema>

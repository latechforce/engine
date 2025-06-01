// Third-party imports
import { z } from 'zod/v4'

// Form domain imports
import { inputSchema } from '@/form/domain/schema/input'

export const formSchema = z
  .object({
    path: z.string(),
    action: z.string(),
    name: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    inputs: z.array(inputSchema).default([]),
    successMessage: z.string().optional(),
  })
  .meta({
    title: 'Form',
    description: 'The form is a collection of inputs',
  })

export type FormSchema = z.infer<typeof formSchema>

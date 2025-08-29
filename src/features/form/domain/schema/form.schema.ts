// Third-party imports
import { z } from 'zod/v4'
import pkg from 'package.json'

// Form domain imports
import { inputSchema } from './input'

export const formSchema = z
  .object({
    id: z.number(),
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
    version: pkg.version,
  })

export type FormSchema = z.infer<typeof formSchema>

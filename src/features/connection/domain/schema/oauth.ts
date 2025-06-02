// Third-party imports
import { z } from 'zod/v4'
import { baseConnectionSchema } from './base'

export const oauthConnectionSchema = baseConnectionSchema.extend({
  clientId: z.string(),
  clientSecret: z.string(),
})

export type OauthConnectionSchema = z.infer<typeof oauthConnectionSchema>

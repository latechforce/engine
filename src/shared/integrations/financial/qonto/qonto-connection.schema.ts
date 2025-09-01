import { z } from 'zod/v4'
import { oauthConnectionSchema } from '../../../../features/connection/domain/schema/oauth'

export const qontoConnectionSchema = oauthConnectionSchema
  .extend({
    service: z.literal('qonto'),
  })
  .meta({
    title: 'Qonto',
    description: 'The Qonto connection is a connection to the Qonto API',
  })

export type QontoConnectionSchema = z.infer<typeof qontoConnectionSchema>

import { z } from 'zod/v4'
import { calendlyConnectionSchema } from './calendly/calendly-connection.schema'
import { googleConnectionSchema } from './google/google-connection.schema'
import { airtableConnectionSchema } from './airtable/airtable-connection.schema'
import { facebookConnectionSchema } from './facebook/facebook-connection.schema'
import { linkedinConnectionSchema } from './linkedin/linkedin-connection.schema'

export const connectionSchema = z
  .union([
    calendlyConnectionSchema,
    airtableConnectionSchema,
    googleConnectionSchema,
    linkedinConnectionSchema,
    facebookConnectionSchema,
  ])
  .meta({
    title: 'Connection',
    description: 'The connection is a connection to an external service',
  })

export type ConnectionSchema = z.infer<typeof connectionSchema>

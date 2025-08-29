import { z } from 'zod/v4'
import pkg from 'package.json'

import { calendlyConnectionSchema } from '../productivity/calendly/calendly-connection.schema'
import { googleConnectionSchema } from '../communication/google/google-connection.schema'
import { airtableConnectionSchema } from '../productivity/airtable/airtable-connection.schema'
import { facebookConnectionSchema } from '../social/facebook/facebook-connection.schema'
import { linkedinConnectionSchema } from '../social/linkedin/linkedin-connection.schema'

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
    version: pkg.version,
  })

export type ConnectionSchema = z.infer<typeof connectionSchema>

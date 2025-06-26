import { z } from 'zod/v4'
import { calendlyConnectionSchema } from './calendly/calendly-connection.schema'
import { googleConnectionSchema } from './google/google-connection.schema'
import { facebookLeadAdsConnectionSchema } from './facebook/lead-ads/facebook-lead-ads-connection.schema'
import { linkedinAdsConnectionSchema } from './linkedin/ads/linkedin-ads-connection.schema'
import { airtableConnectionSchema } from './airtable/airtable-connection.schema'

export const connectionSchema = z
  .union([
    calendlyConnectionSchema,
    airtableConnectionSchema,
    googleConnectionSchema,
    facebookLeadAdsConnectionSchema,
    linkedinAdsConnectionSchema,
  ])
  .meta({
    title: 'Connection',
    description: 'The connection is a connection to an external service',
  })

export type ConnectionSchema = z.infer<typeof connectionSchema>

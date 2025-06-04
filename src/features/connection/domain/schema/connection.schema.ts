// Third-party imports
import { z } from 'zod/v4'

// Connection domain imports
import { calendlyConnectionSchema } from './integration/calendly.schema'
import { googleSheetsConnectionSchema } from './integration/google-sheets.schema'
import { facebookLeadAdsConnectionSchema } from './integration/facebook-lead-ads.schema'
import { linkedinAdsConnectionSchema } from './integration/linkedin-ads.schema'

export const connectionSchema = z
  .union([
    calendlyConnectionSchema,
    googleSheetsConnectionSchema,
    facebookLeadAdsConnectionSchema,
    linkedinAdsConnectionSchema,
  ])
  .meta({
    title: 'Connection',
    description: 'The connection is a connection to an external service',
  })

export type ConnectionSchema = z.infer<typeof connectionSchema>

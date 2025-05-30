// Third-party imports
import { z } from 'zod/v4'

// Connection domain imports
import { calendlyConnectionValidator } from './integration/calendly.schema'
import { googleSheetsConnectionValidator } from './integration/google-sheets.schema'
import { facebookLeadAdsConnectionValidator } from './integration/facebook-lead-ads.schema'
import { linkedinAdsConnectionValidator } from './integration/linkedin-ads.schema'
import { youcanbookmeConnectionValidator } from './integration/youcanbookme.schema'

export const connectionValidator = z
  .union([
    calendlyConnectionValidator,
    googleSheetsConnectionValidator,
    facebookLeadAdsConnectionValidator,
    linkedinAdsConnectionValidator,
    youcanbookmeConnectionValidator,
  ])
  .meta({
    title: 'Connection',
    description: 'The connection is a connection to an external service',
  })

export type ConnectionSchema = z.infer<typeof connectionValidator>

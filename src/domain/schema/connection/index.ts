import { z } from 'zod/v4'
import { calendlyConnectionValidator } from './calendly.schema'
import { googleSheetsConnectionValidator } from './google-sheets.schema'
import { facebookLeadAdsConnectionValidator } from './facebook-lead-ads.schema'
import { linkedinAdsConnectionValidator } from './linkedin-ads.schema'
import { youcanbookmeConnectionValidator } from './youcanbookme.schema'

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

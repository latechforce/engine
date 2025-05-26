import { z } from 'zod/v4'
import { calendlyConnectionValidator } from './calendly.validator'
import { googleSheetsConnectionValidator } from './google-sheets.validator'
import { facebookLeadAdsConnectionValidator } from './facebook-lead-ads.validator'
import { linkedinAdsConnectionValidator } from './linkedin-ads.validator'
import { youcanbookmeConnectionValidator } from './youcanbookme.validator'

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

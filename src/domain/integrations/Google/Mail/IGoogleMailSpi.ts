import type { GoogleMailEmailResponse } from './GoogleMailTypes'
import type { GoogleMailEmailOptions } from './GoogleMailTypes'
import type { BaseSpi } from '../../base'
import type { GoogleMailConfig } from './GoogleMailConfig'
import type { IntegrationResponse } from '/domain/integrations/base'
export interface IGoogleMailSpi extends BaseSpi<GoogleMailConfig> {
  sendEmail: (
    options: GoogleMailEmailOptions
  ) => Promise<IntegrationResponse<GoogleMailEmailResponse>>
}

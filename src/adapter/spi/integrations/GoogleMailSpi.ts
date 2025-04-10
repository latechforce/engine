import type {
  GoogleMailConfig,
  GoogleMailEmailOptions,
  GoogleMailEmailResponse,
  IGoogleMailSpi,
} from '/domain/integrations/Google/Mail'
import { BaseSpi, type BaseIntegration } from './base'
import type { IntegrationResponse } from '/domain/integrations/base'

export interface IGoogleMailIntegration extends BaseIntegration<GoogleMailConfig> {
  sendEmail: (
    options: GoogleMailEmailOptions
  ) => Promise<IntegrationResponse<GoogleMailEmailResponse>>
}

export class GoogleMailSpi
  extends BaseSpi<GoogleMailConfig, IGoogleMailIntegration>
  implements IGoogleMailSpi
{
  constructor(integration: IGoogleMailIntegration) {
    super(integration)
  }

  sendEmail = async (
    options: GoogleMailEmailOptions
  ): Promise<IntegrationResponse<GoogleMailEmailResponse>> => {
    return this._integration.sendEmail(options)
  }
}

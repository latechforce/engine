import type { IJotformIntegration } from '/adapter/spi/integrations/JotformSpi'
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'
import type { JotformConfig } from '/domain/integrations/Jotform/JotformConfig'
import { BaseMockIntegration } from '../base'

export class JotformIntegration extends BaseMockIntegration implements IJotformIntegration {
  constructor(public config: JotformConfig) {
    super(config, config.apiKey)
  }
}

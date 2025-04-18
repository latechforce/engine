import { BaseSpi } from './base'
import type { IJotformSpi } from '/domain/integrations/Jotform/IJotformSpi'

export type IJotformIntegration = IJotformSpi

export class JotformSpi extends BaseSpi<JotformConfig, IJotformIntegration> implements IJotformSpi {
  constructor(integration: IJotformIntegration) {
    super(integration)
  }
}

import { BaseSpi } from './base'
import type { ICalendlySpi } from '/domain/integrations/Calendly/ICalendlySpi'

export type ICalendlyIntegration = ICalendlySpi

export class CalendlySpi extends BaseSpi<ICalendlyIntegration> implements ICalendlySpi {
  constructor(integration: ICalendlyIntegration) {
    super(integration)
  }
}

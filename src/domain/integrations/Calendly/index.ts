import type { ICalendlySpi } from './ICalendlySpi'
import { Integration } from '../base'

export class Calendly extends Integration<ICalendlySpi> {
  constructor(spi: ICalendlySpi) {
    super(spi)
  }
}

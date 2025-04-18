import type { IJotformSpi } from './IJotformSpi'
import { Integration } from '../base'
import type { JotformConfig } from './JotformConfig'

export class Jotform extends Integration<JotformConfig, IJotformSpi> {
  constructor(spis: IJotformSpi[]) {
    super(spis)
  }
}

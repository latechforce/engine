import type { IYouCanBookMeSpi } from './IYouCanBookMeSpi'
import { Integration } from '../base'

export class YouCanBookMe extends Integration<IYouCanBookMeSpi> {
  constructor(spi: IYouCanBookMeSpi) {
    super(spi)
  }
}

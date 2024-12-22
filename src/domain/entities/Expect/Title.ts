import type { BrowserPage } from '@domain/services/BrowserPage'
import { type BaseExpect } from './base'
import { TestError } from '@domain/entities/Error/Test'
import type { StartedApp } from '../App/Started'

export interface TitleExpectConfig {
  title: string
}

export class TitleExpect implements BaseExpect {
  constructor(private _config: TitleExpectConfig) {}

  execute = async (_app: StartedApp, page: BrowserPage, _context?: object) => {
    const { title } = this._config
    const pageTitle = await page.getTitle()
    if (pageTitle !== title) {
      throw new TestError({
        code: 'INVALID_TITLE',
        expected: title,
        received: pageTitle,
      })
    }
  }
}

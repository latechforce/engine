import debug from 'debug'
import { ConfigUtils } from '@common/server'
import DatabaseConfig from '@database/server/configs/database.config'
import TableConfig from '@table/server/configs/table.config'
import PageConfig from '@page/server/configs/page.config'

import type { ConfigInterface } from '@common/server'

class Config {
  private Configs: ConfigInterface[] = [DatabaseConfig, TableConfig, PageConfig]

  public init(): void {
    const log = debug('config:init')
    try {
      log('load config file')
      ConfigUtils.init()

      log('enrich configs')
      for (const Config of this.Configs) if (typeof Config.enrich === 'function') Config.enrich()

      log('validate schemas')
      for (const Config of this.Configs)
        if (typeof Config.validate === 'function') Config.validate()

      log('setup libs')
      for (const Config of this.Configs) if (typeof Config.lib === 'function') Config.lib()

      log('build js codes')
      for (const Config of this.Configs) if (typeof Config.js === 'function') Config.js()

      log('cache config file')
      ConfigUtils.cache()
    } catch (error: unknown) {
      if (error instanceof Error) {
        debug('config:error')(error.message)
      } else {
        throw error
      }
    }
  }
}

export default new Config()
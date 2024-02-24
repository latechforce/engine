import { Page } from '@domain/engine/page/Page'
import { Services } from '@domain/services'
import type { Page as PageConfig } from '../../configs/page/Page'
import { ComponentMapper } from './ComponentMapper'
import { HeadMapper } from './HeadMapper'
import type { Mapper } from '../Mapper'
import type { Server } from '@domain/services/Server'
import type { Ui } from '@domain/services/Ui'
import type { Logger } from '@domain/services/Logger'
import type { ReactComponents } from '@domain/engine/page/component'
import type { IdGenerator } from '@domain/services/IdGenerator'
import type { Realtime } from '@domain/services/Realtime'

export interface Params {
  server: Server
  ui: Ui
  idGenerator: IdGenerator
  newLogger: (location: string) => Logger
  components: ReactComponents
  realtime?: Realtime
}

export const PageMapper: Mapper<PageConfig, Page, Params> = class PageMapper {
  static toEntity = (config: PageConfig, params: Params): Page => {
    const { name, path } = config
    const { server, newLogger, ui, components, idGenerator, realtime } = params
    const logger = newLogger(`page:${config.name}`)
    const body = ComponentMapper.toManyEntities(config.body, {
      components,
      server,
      ui,
      idGenerator,
      realtime
    })
    const head = HeadMapper.toEntity(config.head ?? {}, { ui })
    return new Page({ name, path, head, body, server, logger, ui, Html: components.Html })
  }

  static toManyEntities = (configs: PageConfig[], params: Params) => {
    return configs.map((config) => this.toEntity(config, params))
  }

  static toEntityFromServices = (config: PageConfig, services: Services) => {
    const ui = services.ui()
    const server = services.server({
      logger: services.logger({ location: `server` }),
    })
    const idGenerator = services.idGenerator()
    const newLogger = (location: string) => services.logger({ location })
    return this.toEntity(config, {
      server,
      newLogger,
      ui,
      components: services.components,
      idGenerator,
    })
  }

  static toManyEntitiesFromServices = (configs: PageConfig[], services: Services) => {
    return configs.map((config) => this.toEntityFromServices(config, services))
  }
}

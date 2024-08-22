import type { ReactComponents } from '@domain/entities/Component'
import { Button } from '@domain/entities/Component/base/Button'
import type { IdGenerator } from '@domain/services/IdGenerator'
import type { TemplateCompiler } from '@domain/services/TemplateCompiler'
import type { React } from '@domain/services/React'
import type { Server } from '@domain/services/Server'
import type { Client } from '@domain/services/Client'
import type { Config } from '@adapter/api/configs/Component/base/Button'

interface Services {
  components: ReactComponents
  client: Client
  templateCompiler: TemplateCompiler
  server: Server
  react: React
  idGenerator: IdGenerator
}

export class ButtonMapper {
  static toEntity = (config: Config, services: Services): Button => {
    const { variant = 'primary', ...res } = config
    const { components, client, templateCompiler, server, react, idGenerator } = services
    return new Button({
      ...res,
      variant,
      Component: components.Button,
      client,
      templateCompiler,
      server,
      react,
      idGenerator,
    })
  }

  static toManyEntities = (configs: Config[], services: Services): Button[] => {
    return configs.map((config) => this.toEntity(config, services))
  }
}

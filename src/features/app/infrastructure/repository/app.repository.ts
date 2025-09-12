// Third-party imports
import { z } from 'zod/v4'

// Shared imports
import {
  ServerService,
  EnvService,
  LoggerService,
  DatabaseService,
  type TemplateService,
} from '../../../../shared/infrastructure/service'

// App domain imports
import type { IAppRepository } from '../../domain/repository-interface/app-repository.interface'
import type { App } from '../../domain/entity/app.entity'
import { appSchema } from '../../domain/schema/app.schema'
import type { ValidateResult } from '../../domain/value-object/validate-result.value-object'

// User infrastructure imports
import type { AuthService } from '../../../user/infrastructure/service/auth.service'

export class AppRepository implements IAppRepository {
  constructor(
    private readonly env: EnvService,
    private readonly logger: LoggerService,
    private readonly database: DatabaseService,
    private readonly auth: AuthService,
    private readonly server: ServerService,
    private readonly template: TemplateService
  ) {}

  info(message: string) {
    this.logger.info(message)
  }

  error(message: string) {
    this.logger.child('app-repository').error(message)
  }

  async loadEnv() {
    return this.env.load()
  }

  fillSchemaEnvVariables<T extends { [key: string]: unknown }>(schema: T): T {
    return this.template.fillObject(schema)
  }

  validate(unknownSchema: unknown): ValidateResult {
    const { success, error, data } = appSchema.safeParse(unknownSchema)
    if (!success) {
      return { error: z.prettifyError(error) }
    }
    return { schema: data }
  }

  async setup(app: App) {
    await this.database.migrate()
    await this.auth.setup()
    this.server.addOpenAPIDoc(app)

    // Register page routes with the server
    for (const page of app.pages) {
      this.server.registerPageRoute(page.path, async () => {
        return page.generateHTML() // Currently synchronous, but wrapped in async for future SSR support
      })
      this.logger.info(`Registered page route: ${page.path} (${page.name})`)
    }
  }

  async start() {
    this.server.start()
  }

  async stop() {
    await this.server.stop()
    await this.database.stop()
  }
}

import type { EnvService } from '../service/env.service'
import type { LoggerService } from '../service/logger.service'
import { inject, injectable } from 'inversify'
import type { ServerService } from '../service/server.service'
import TYPES from '../../application/di/types'
import type {
  AppHonoContext,
  AppHonoContextType,
} from '../../../features/app/infrastructure/di/context'
import type { App } from '../../../features/app/domain/entity/app.entity'
import type {
  UserHonoContext,
  UserHonoContextType,
} from '../../../features/user/infrastructure/di/context'
import type {
  AutomationHonoContext,
  AutomationHonoContextType,
} from '../../../features/automation/infrastructure/di/context'
import type {
  ConnectionHonoContext,
  ConnectionHonoContextType,
} from '../../../features/connection/infrastructure/di/context'
import type {
  FormHonoContext,
  FormHonoContextType,
} from '../../../features/form/infrastructure/di/context'
import type {
  RunHonoContext,
  RunHonoContextType,
} from '../../../features/run/infrastructure/di/context'
import type {
  TableHonoContext,
  TableHonoContextType,
} from '../../../features/table/infrastructure/di/context'
import type {
  TriggerHonoContext,
  TriggerHonoContextType,
} from '../../../features/trigger/infrastructure/di/context'
import type {
  BucketHonoContext,
  BucketHonoContextType,
} from '../../../features/bucket/infrastructure/di/context'

export type HonoContextType = {
  env: EnvService
  logger: LoggerService
} & AppHonoContextType &
  AutomationHonoContextType &
  ConnectionHonoContextType &
  UserHonoContextType &
  FormHonoContextType &
  RunHonoContextType &
  TableHonoContextType &
  TriggerHonoContextType &
  BucketHonoContextType

@injectable()
export class HonoContext {
  constructor(
    @inject(TYPES.Service.Server)
    private readonly server: ServerService,
    @inject(TYPES.Service.Env)
    private readonly env: EnvService,
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.App.HonoContext)
    private readonly appContext: AppHonoContext,
    @inject(TYPES.User.HonoContext)
    private readonly userContext: UserHonoContext,
    @inject(TYPES.Automation.HonoContext)
    private readonly automationContext: AutomationHonoContext,
    @inject(TYPES.Connection.HonoContext)
    private readonly connectionContext: ConnectionHonoContext,
    @inject(TYPES.Form.HonoContext)
    private readonly formContext: FormHonoContext,
    @inject(TYPES.Run.HonoContext)
    private readonly runContext: RunHonoContext,
    @inject(TYPES.Table.HonoContext)
    private readonly tableContext: TableHonoContext,
    @inject(TYPES.Trigger.HonoContext)
    private readonly triggerContext: TriggerHonoContext,
    @inject(TYPES.Bucket.HonoContext)
    private readonly bucketContext: BucketHonoContext
  ) {}

  setVariables(app: App) {
    this.server.use(async (c, next) => {
      c.set('env', this.env)
      c.set('logger', this.logger)
      this.appContext.setVariables(c, app)
      this.userContext.setVariables(c)
      this.automationContext.setVariables(c)
      this.connectionContext.setVariables(c)
      this.formContext.setVariables(c)
      this.runContext.setVariables(c)
      this.tableContext.setVariables(c)
      this.triggerContext.setVariables(c)
      this.bucketContext.setVariables(c)
      await next()
    })
  }
}

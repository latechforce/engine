import APP_TYPES from '@/app/infrastructure/di/types'
import ACTION_TYPES from '@/action/infrastructure/di/types'
import USER_TYPES from '@/user/infrastructure/di/types'
import AUTOMATION_TYPES from '@/automation/infrastructure/di/types'
import CONNECTION_TYPES from '@/connection/infrastructure/di/types'
import FORM_TYPES from '@/form/infrastructure/di/types'
import RUN_TYPES from '@/run/infrastructure/di/types'
import TABLE_TYPES from '@/table/infrastructure/di/types'
import TRIGGER_TYPES from '@/trigger/infrastructure/di/types'

const TYPES = {
  App: APP_TYPES,
  Action: ACTION_TYPES,
  User: USER_TYPES,
  Automation: AUTOMATION_TYPES,
  Connection: CONNECTION_TYPES,
  Form: FORM_TYPES,
  Run: RUN_TYPES,
  Table: TABLE_TYPES,
  Trigger: TRIGGER_TYPES,
  Service: {
    Env: Symbol.for('EnvService'),
    Logger: Symbol.for('LoggerService'),
    Server: Symbol.for('ServerService'),
    Database: Symbol.for('DatabaseService'),
    Validator: Symbol.for('ValidatorService'),
    Template: Symbol.for('TemplateService'),
  },
  HonoContext: Symbol.for('HonoContext'),
}

export default TYPES

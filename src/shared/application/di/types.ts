// Feature type imports
import APP_TYPES from '@/app/application/di/types'
import ACTION_TYPES from '@/action/application/di/types'
import USER_TYPES from '@/user/application/di/types'
import AUTOMATION_TYPES from '@/automation/application/di/types'
import CONNECTION_TYPES from '@/connection/application/di/types'
import FORM_TYPES from '@/form/application/di/types'
import RUN_TYPES from '@/run/application/di/types'
import TABLE_TYPES from '@/table/application/di/types'
import TRIGGER_TYPES from '@/trigger/application/di/types'

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
  Hono: {
    Context: Symbol.for('HonoContext'),
    Routes: Symbol.for('HonoRoutes'),
  },
}

export default TYPES

// Feature type imports
import APP_TYPES from '../../../features/app/application/di/types'
import ACTION_TYPES from '../../../features/action/application/di/types'
import USER_TYPES from '../../../features/user/application/di/types'
import AUTOMATION_TYPES from '../../../features/automation/application/di/types'
import CONNECTION_TYPES from '../../../features/connection/application/di/types'
import FORM_TYPES from '../../../features/form/application/di/types'
import RUN_TYPES from '../../../features/run/application/di/types'
import TABLE_TYPES from '../../../features/table/application/di/types'
import TRIGGER_TYPES from '../../../features/trigger/application/di/types'
import BUCKET_TYPES from '../../../features/bucket/application/di/types'

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
  Bucket: BUCKET_TYPES,
  Service: {
    Env: Symbol.for('EnvService'),
    Logger: Symbol.for('LoggerService'),
    Server: Symbol.for('ServerService'),
    Database: Symbol.for('DatabaseService'),
    Schema: Symbol.for('SchemaService'),
    Template: Symbol.for('TemplateService'),
  },
  Hono: {
    Context: Symbol.for('HonoContext'),
    Routes: Symbol.for('HonoRoutes'),
  },
}

export default TYPES

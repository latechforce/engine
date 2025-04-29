import type { CreateRecordDatabaseAction } from './services/database/CreateRecord'
import type { RunJavascriptCodeAction } from './services/code/RunJavascript'
import type { RunTypescriptCodeAction } from './services/code/RunTypescript'
import type { ReadRecordDatabaseAction } from './services/database/ReadRecord'
import type { GetCompanyPappersAction } from './integrations/pappers/GetCompany'
import type { CreateClientQontoAction } from './integrations/qonto/CreateClient'
import type { UpdatePageNotionAction } from './integrations/notion/UpdatePage'
import type { SendEmailGoogleMailAction } from './integrations/googleMail/SendEmail'
import type { CreatePaymentGoCardlessAction } from './integrations/gocardless/CreatePayment'
import type { ListPaymentsGoCardlessAction } from './integrations/gocardless/ListPayments'
import type { RetrieveAttachmentQontoAction } from './integrations/qonto/RetrieveAttachment'

export type Action =
  | CreateRecordDatabaseAction
  | ReadRecordDatabaseAction
  | RunJavascriptCodeAction
  | RunTypescriptCodeAction
  | GetCompanyPappersAction
  | CreateClientQontoAction
  | UpdatePageNotionAction
  | SendEmailGoogleMailAction
  | CreatePaymentGoCardlessAction
  | ListPaymentsGoCardlessAction
  | RetrieveAttachmentQontoAction

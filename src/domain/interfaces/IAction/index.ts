import type { ICreateRecordDatabaseAction } from './services/database/ICreateRecord'
import type { IRunJavascriptCodeAction } from './services/code/IRunJavascript'
import type { IRunTypescriptCodeAction } from './services/code/IRunTypescript'
import type { IReadRecordDatabaseAction } from './services/database/IReadRecord'
import type { IGetCompanyPappersAction } from './integrations/pappers/IGetCompany'
import type { ICreateClientQontoAction } from './integrations/qonto/ICreateClient'
import type { IUpdatePageNotionAction } from './integrations/notion/IUpdatePage'
import type { ISendEmailGoogleMailAction } from './integrations/googleMail/ISendEmail'
import type { ICreatePaymentGoCardlessAction } from './integrations/gocardless/ICreatePayment'
import type { IListPaymentsGoCardlessAction } from './integrations/gocardless/IListPayments'
import type { IRetrieveAttachmentQontoAction } from './integrations/qonto/IRetrieveAttachment'

export type IAction =
  | IRunJavascriptCodeAction
  | IRunTypescriptCodeAction
  | ICreateRecordDatabaseAction
  | IReadRecordDatabaseAction
  | IGetCompanyPappersAction
  | ICreateClientQontoAction
  | IUpdatePageNotionAction
  | ISendEmailGoogleMailAction
  | ICreatePaymentGoCardlessAction
  | IListPaymentsGoCardlessAction
  | IRetrieveAttachmentQontoAction

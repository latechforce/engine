import type { CreateRecordDatabaseAction } from './database/CreateRecord'
import type { RunJavascriptCodeAction } from './code/RunJavascript'
import type { RunTypescriptCodeAction } from './code/RunTypescript'
import type { ReadRecordDatabaseAction } from './database/ReadRecord'
import type { GetCompanyPappersAction } from './pappers/GetCompany'
import type { CreateClientQontoAction } from './qonto/CreateClient'
import type { UpdatePageNotionAction } from './notion/UpdatePage'
import type { SendEmailGoogleMailAction } from './googleMail/SendEmail'
import type { CreatePaymentGoCardlessAction } from './gocardless/CreatePayment'
import type { ListPaymentsGoCardlessAction } from './gocardless/ListPayments'
import type { RetrieveAttachmentQontoAction } from './qonto/RetrieveAttachment'
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

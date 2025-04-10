import type { CreateRecordDatabaseAction } from '/domain/entities/Action/services/database/CreateRecord'
import type { RunJavascriptCodeAction } from '/domain/entities/Action/services/code/RunJavascript'
import type { RunTypescriptCodeAction } from '/domain/entities/Action/services/code/RunTypescript'
import type { ReadRecordDatabaseAction } from '/domain/entities/Action/services/database/ReadRecord'
import type { GetCompanyPappersAction } from '/domain/entities/Action/integrations/pappers/GetCompany'
import type { CreateClientQontoAction } from '/domain/entities/Action/integrations/qonto/CreateClient'
import type { UpdatePageNotionAction } from '/domain/entities/Action/integrations/notion/UpdatePage'
import type { SendEmailGoogleMailAction } from '/domain/entities/Action/integrations/googleMail/SendEmail'
import type { CreatePaymentGoCardlessAction } from '/domain/entities/Action/integrations/gocardless/CreatePayment'
import type { ListPaymentsGoCardlessAction } from '/domain/entities/Action/integrations/gocardless/ListPayments'
import type { RetrieveAttachmentQontoAction } from '/domain/entities/Action/integrations/qonto/RetrieveAttachment'

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

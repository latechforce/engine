import type { ICreateRecordDatabaseAction } from './database/ICreateRecord'
import type { IRunJavascriptCodeAction } from './code/IRunJavascript'
import type { IRunTypescriptCodeAction } from './code/IRunTypescript'
import type { IReadRecordDatabaseAction } from './database/IReadRecord'
import type { IGetCompanyPappersAction } from './pappers/IGetCompany'
import type { ICreateClientQontoAction } from './qonto/ICreateClient'
import type { IUpdatePageNotionAction } from './notion/IUpdatePage'
import type { ISendEmailGoogleMailAction } from './googleMail/ISendEmail'
import type { ICreatePaymentGoCardlessAction } from './gocardless/ICreatePayment'

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

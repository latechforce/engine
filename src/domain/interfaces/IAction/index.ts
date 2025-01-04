import type { ICreateDocxFromTemplateDocumentAction } from './document/ICreateDocxFromTemplate'
import type { ICreateXlsxFromTemplateSpreadsheetAction } from './spreadsheet/ICreateXlsxFromTemplate'
import type { ICreateRecordDatabaseAction } from './database/ICreateRecord'
import type { IRunJavascriptCodeAction } from './code/IRunJavascript'
import type { IRunTypescriptCodeAction } from './code/IRunTypescript'
import type { ISendEmailMailerAction } from './mailer/ISendEmail'
import type { IReadRecordDatabaseAction } from './database/IReadRecord'
import type { ICreatePdfFromXlsxSpreadsheetAction } from './spreadsheet/ICreatePdfFromXlsx'
import type { IGetCompanyPappersAction } from './pappers/IGetCompany'
import type { ICreateClientQontoAction } from './qonto/ICreateClient'
import type { IUpdatePageNotionAction } from './notion/IUpdatePage'

export type IAction =
  | IRunJavascriptCodeAction
  | IRunTypescriptCodeAction
  | ICreateDocxFromTemplateDocumentAction
  | ICreateXlsxFromTemplateSpreadsheetAction
  | ICreateRecordDatabaseAction
  | ISendEmailMailerAction
  | IReadRecordDatabaseAction
  | ICreatePdfFromXlsxSpreadsheetAction
  | IGetCompanyPappersAction
  | ICreateClientQontoAction
  | IUpdatePageNotionAction

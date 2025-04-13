import type { CreatePaymentGoCardlessActionSchema } from './GoCardless/CreatePaymentSchema'
import type { ListPaymentsGoCardlessActionSchema } from './GoCardless/ListPaymentsSchema'
import type { SendEmailGoogleMailActionSchema } from './Google/Gmail/SendEmailSchema'
import type { UpdatePageNotionActionSchema } from './Notion/UpdatePageSchema'
import type { GetCompanyPappersActionSchema } from './Pappers/GetCompanySchema'
import type { CreateClientQontoActionSchema } from './Qonto/CreateClientSchema'
import type { RetrieveAttachmentQontoActionSchema } from './Qonto/RetrieveAttachmentSchema'

export type ActionIntegrationSchema =
  | GetCompanyPappersActionSchema
  | CreateClientQontoActionSchema
  | UpdatePageNotionActionSchema
  | SendEmailGoogleMailActionSchema
  | CreatePaymentGoCardlessActionSchema
  | ListPaymentsGoCardlessActionSchema
  | RetrieveAttachmentQontoActionSchema

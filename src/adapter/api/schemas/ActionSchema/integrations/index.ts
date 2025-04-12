import type { CreatePaymentGoCardlessActionSchema } from './gocardless/CreatePaymentSchema'
import type { ListPaymentsGoCardlessActionSchema } from './gocardless/ListPaymentsSchema'
import type { SendEmailGoogleMailActionSchema } from './googleMail/SendEmailSchema'
import type { UpdatePageNotionActionSchema } from './notion/UpdatePageSchema'
import type { GetCompanyPappersActionSchema } from './pappers/GetCompanySchema'
import type { CreateClientQontoActionSchema } from './qonto/CreateClientSchema'
import type { RetrieveAttachmentQontoActionSchema } from './qonto/RetrieveAttachmentSchema'

export type ActionIntegrationSchema =
  | GetCompanyPappersActionSchema
  | CreateClientQontoActionSchema
  | UpdatePageNotionActionSchema
  | SendEmailGoogleMailActionSchema
  | CreatePaymentGoCardlessActionSchema
  | ListPaymentsGoCardlessActionSchema
  | RetrieveAttachmentQontoActionSchema

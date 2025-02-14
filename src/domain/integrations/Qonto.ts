export interface QontoSandboxConfig extends Omit<QontoProductionConfig, 'environment'> {
  environment: 'sandbox'
  stagingToken: string
}

export interface QontoProductionConfig {
  environment: 'production'
  organisationSlug: string
  secretKey: string
}

export type QontoConfig = QontoSandboxConfig | QontoProductionConfig

export interface IQontoSpi {
  getConfig: () => QontoConfig
  createClient: (client: QontoCreateClient) => Promise<QontoClient>
  createClientInvoice: (invoice: QontoCreateClientInvoice) => Promise<QontoClientInvoice>
  listClientInvoices: () => Promise<QontoClientInvoice[]>
}

export class Qonto {
  constructor(private _spi: IQontoSpi) {}

  getConfig = (): QontoConfig => {
    return this._spi.getConfig()
  }

  createClient = async (client: QontoCreateClient): Promise<QontoClient> => {
    return this._spi.createClient(client)
  }

  createClientInvoice = async (invoice: QontoCreateClientInvoice): Promise<QontoClientInvoice> => {
    return this._spi.createClientInvoice(invoice)
  }

  listClientInvoices = async (): Promise<QontoClientInvoice[]> => {
    return this._spi.listClientInvoices()
  }
}

interface QontoBillingAddress {
  street_address: string
  city: string
  zip_code: string
  province_code: string
  country_code: string
}

interface QontoDeliveryAddress {
  street_address: string
  city: string
  zip_code: string
  province_code: string
  country_code: string
}

export interface QontoClient {
  id: string
  email?: string
  vat_number?: string
  name?: string
  first_name?: string
  last_name?: string
  type: string
  tax_identification_number?: string
  address: string
  city: string
  zip_code: string
  country_code: string
  billing_address?: QontoBillingAddress
  delivery_address?: QontoDeliveryAddress
  created_at: string
  locale: string
}

export type QontoCreateClient = Omit<QontoClient, 'id' | 'created_at'> & {
  currency: string
}

type CurrencyAmount = {
  value: string
  currency: string
}

type InvoiceItem = {
  title: string
  description?: string
  quantity: string
  unit?: string
  unit_price: CurrencyAmount
  unit_price_cents: number
  vat_rate: string
  vat_exemption_reason?: string
  discount?: {
    type: string
    value: string
    amount: CurrencyAmount
  }
  total_vat: CurrencyAmount
  total_vat_cents: number
  total_amount: CurrencyAmount
  total_amount_cents: number
  subtotal: CurrencyAmount
  subtotal_cents: number
}

type CreateInvoiceItem = {
  title: string
  description?: string
  quantity: string
  unit?: string
  unit_price: CurrencyAmount
  vat_rate: string
  vat_exemption_reason?: string
  discount?: {
    type: string
    value: string
    amount: CurrencyAmount
  }
}

type PaymentMethod = {
  beneficiary_name: string
  bic: string
  iban: string
  type: string
}

export type QontoOrganization = {
  id: string
  legal_name: string
  legal_number: string
  legal_country: string
  address_line_1: string
  address_line_2: string
  address_zipcode: string
  address_city: string
  address_country: string
  company_leadership: string
  district_court: string
  commercial_register_number: string
  vat_number: string
  tax_number: string
  legal_capital_share: CurrencyAmount
  transaction_type: string
  vat_payment_condition: string
}

type WelfareFund = {
  type: string
  rate: string
}

type WithholdingTax = {
  reason: string
  rate: string
  payment_reason: string
  amount: string
}

type PaymentReporting = {
  conditions: string
  method: string
}

type PaymentMethods = {
  iban: string
}

type InvoiceSettings = {
  vat_number: string
  company_leadership: string
  district_court: string
  commercial_register_number: string
  tax_number: string
  legal_capital_share: CurrencyAmount
  transaction_type: string
  vat_payment_condition: string
  discount_conditions: string
  late_payment_penalties: string
  legal_fixed_compensation: string
}

export type QontoCreateClientInvoice = {
  client_id: string
  issue_date: string
  performance_date?: string
  due_date: string
  status: 'draft' | 'unpaid'
  number?: string
  purchase_order?: string
  terms_and_conditions?: string
  header?: string
  footer?: string
  currency: 'EUR'
  payment_methods: PaymentMethods
  settings?: InvoiceSettings
  items: CreateInvoiceItem[]
  report_einvoicing?: boolean
  payment_reporting?: PaymentReporting
  welfare_fund?: WelfareFund
  withholding_tax?: WithholdingTax
  stamp_duty_amount?: string
}

export type QontoClientInvoice = {
  id: string
  organization_id: string
  attachment_id: string
  number: string
  purchase_order: string
  status: string
  invoice_url: string
  contact_email: string
  terms_and_conditions: string
  discount_conditions: string
  late_payment_penalties: string
  legal_fixed_compensation: string
  header: string
  footer: string
  currency: string
  total_amount: CurrencyAmount
  total_amount_cents: number
  vat_amount: CurrencyAmount
  vat_amount_cents: number
  issue_date: string
  due_date: string
  performance_date: string
  created_at: string
  finalized_at: string
  paid_at: string
  stamp_duty_amount: string
  items: InvoiceItem[]
  client: QontoClient
  payment_methods: PaymentMethod[]
  credit_notes_ids: string[]
  organization: QontoOrganization
  einvoicing_status: string
  welfare_fund: WelfareFund
  withholding_tax: WithholdingTax
  payment_reporting: PaymentReporting
}

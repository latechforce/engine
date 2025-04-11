import type {
  QontoClient,
  QontoCreateClient,
  QontoClientInvoice,
  QontoCreateClientInvoice,
  QontoOrganization,
  QontoAttachment,
} from '/domain/integrations/Qonto/QontoTypes'
import type { IQontoIntegration } from '/adapter/spi/integrations/QontoSpi'
import fsExtra from 'fs-extra'
import PDFDocument from 'pdfkit'
import type { IntegrationResponse } from '/domain/integrations/base'
import type { QontoConfig } from '/domain/integrations/Qonto/QontoConfig'
import { BaseMockIntegration } from '../base'
import type { SQLiteDatabaseTableDriver } from '../../../../drivers/bun/DatabaseDriver/SQLite/SQLiteTableDriver'
import type { RecordFields } from '/domain/entities/Record'

export class QontoIntegration extends BaseMockIntegration implements IQontoIntegration {
  private _clients: SQLiteDatabaseTableDriver
  private _clientInvoices: SQLiteDatabaseTableDriver
  private _attachments: SQLiteDatabaseTableDriver

  constructor(public config: QontoConfig) {
    super(config, config.secretKey)
    this._clients = this._db.table({
      name: 'clients',
      fields: [
        { name: 'type', type: 'SingleLineText' },
        { name: 'email', type: 'SingleLineText' },
        { name: 'vat_number', type: 'SingleLineText' },
        { name: 'tax_identification_number', type: 'SingleLineText' },
        { name: 'address', type: 'SingleLineText' },
        { name: 'city', type: 'SingleLineText' },
        { name: 'zip_code', type: 'SingleLineText' },
        { name: 'country_code', type: 'SingleLineText' },
        { name: 'billing_address', type: 'SingleLineText' },
        { name: 'delivery_address', type: 'SingleLineText' },
        { name: 'name', type: 'SingleLineText' },
        { name: 'first_name', type: 'SingleLineText' },
        { name: 'last_name', type: 'SingleLineText' },
        { name: 'locale', type: 'SingleLineText' },
      ],
    })
    this._clients.ensureSync()
    this._clientInvoices = this._db.table({
      name: 'client_invoices',
      fields: [
        { name: 'client_id', type: 'SingleLineText' },
        { name: 'issue_date', type: 'SingleLineText' },
        { name: 'performance_date', type: 'SingleLineText' },
        { name: 'due_date', type: 'SingleLineText' },
        { name: 'status', type: 'SingleLineText' },
        { name: 'number', type: 'SingleLineText' },
        { name: 'purchase_order', type: 'SingleLineText' },
        { name: 'terms_and_conditions', type: 'SingleLineText' },
        { name: 'header', type: 'SingleLineText' },
        { name: 'footer', type: 'SingleLineText' },
        { name: 'currency', type: 'SingleLineText' },
        { name: 'total_amount_value', type: 'SingleLineText' },
        { name: 'total_amount_currency', type: 'SingleLineText' },
        { name: 'vat_amount_value', type: 'SingleLineText' },
        { name: 'vat_amount_currency', type: 'SingleLineText' },
        { name: 'attachment_id', type: 'SingleLineText' },
      ],
    })
    this._clientInvoices.ensureSync()
    this._attachments = this._db.table({
      name: 'attachments',
      fields: [
        { name: 'file_name', type: 'SingleLineText' },
        { name: 'file_size', type: 'SingleLineText' },
        { name: 'file_content_type', type: 'SingleLineText' },
        { name: 'url', type: 'SingleLineText' },
      ],
    })
    this._attachments.ensureSync()
  }

  createClient = async (client: QontoCreateClient): Promise<IntegrationResponse<QontoClient>> => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`
    const createdAt = new Date().toISOString()
    const billingAddress = client.billing_address ? JSON.stringify(client.billing_address) : null
    const deliveryAddress = client.delivery_address ? JSON.stringify(client.delivery_address) : null
    await this._clients.insert({
      id,
      created_at: createdAt,
      fields: {
        type: client.type,
        email: client.email || '',
        vat_number: client.vat_number || '',
        tax_identification_number: client.tax_identification_number || '',
        address: client.address,
        city: client.city,
        zip_code: client.zip_code,
        country_code: client.country_code,
        billing_address: billingAddress,
        delivery_address: deliveryAddress,
        name: client.name || '',
        first_name: client.first_name || '',
        last_name: client.last_name || '',
        locale: client.locale,
      },
    })
    const createdClient: QontoClient =
      client.type === 'company'
        ? {
            id,
            type: 'company',
            name: client.name!,
            email: client.email,
            vat_number: client.vat_number,
            tax_identification_number: client.tax_identification_number,
            address: client.address,
            city: client.city,
            zip_code: client.zip_code,
            country_code: client.country_code,
            billing_address: client.billing_address,
            delivery_address: client.delivery_address,
            created_at: createdAt,
            locale: client.locale,
          }
        : {
            id,
            type: 'individual',
            first_name: client.first_name!,
            last_name: client.last_name!,
            email: client.email,
            vat_number: client.vat_number,
            tax_identification_number: client.tax_identification_number,
            address: client.address,
            city: client.city,
            zip_code: client.zip_code,
            country_code: client.country_code,
            billing_address: client.billing_address,
            delivery_address: client.delivery_address,
            created_at: createdAt,
            locale: client.locale,
          }
    return { data: createdClient }
  }

  createClientInvoice = async (
    invoice: QontoCreateClientInvoice
  ): Promise<IntegrationResponse<QontoClientInvoice>> => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`
    const createdAt = new Date().toISOString()
    const attachmentId = `att-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`
    const path = process.cwd() + '/tmp/qonto/attachments/' + attachmentId + '.pdf'
    await fsExtra.ensureFile(path)
    const doc = new PDFDocument()
    await new Promise((resolve, reject) => {
      const stream = fsExtra.createWriteStream(path)
      doc.pipe(stream)
      doc.fontSize(25).text(`TEST - Invoice attachment ${attachmentId}`, 100, 100)
      doc.end()
      stream.on('finish', () => resolve(true))
      stream.on('error', reject)
    })
    const mockAttachment: QontoAttachment = {
      id: attachmentId,
      created_at: createdAt,
      file_name: `invoice-${id}.pdf`,
      file_size: 1024,
      file_content_type: 'application/pdf',
      url: `file:/${path}`,
    }
    await this._attachments.insert({
      id: attachmentId,
      created_at: createdAt,
      fields: {
        file_name: mockAttachment.file_name,
        file_size: mockAttachment.file_size.toString(),
        file_content_type: mockAttachment.file_content_type,
        url: mockAttachment.url,
      },
    })
    const totalAmount = invoice.items
      .reduce((acc, item) => acc + parseFloat(item.unit_price.value) * parseFloat(item.quantity), 0)
      .toFixed(2)
    const vatAmount = invoice.items
      .reduce(
        (acc, item) =>
          acc +
          parseFloat(item.unit_price.value) * parseFloat(item.quantity) * parseFloat(item.vat_rate),
        0
      )
      .toFixed(2)
    await this._clientInvoices.insert({
      id,
      created_at: createdAt,
      fields: {
        client_id: invoice.client_id,
        issue_date: invoice.issue_date,
        performance_date: invoice.performance_date || '',
        due_date: invoice.due_date,
        status: invoice.status || 'unpaid',
        number: invoice.number || '',
        purchase_order: invoice.purchase_order || '',
        terms_and_conditions: invoice.terms_and_conditions || '',
        header: invoice.header || '',
        footer: invoice.footer || '',
        currency: invoice.currency,
        total_amount_value: totalAmount,
        total_amount_currency: invoice.currency,
        vat_amount_value: vatAmount,
        vat_amount_currency: invoice.currency,
        attachment_id: attachmentId,
      },
    })
    return {
      data: {
        id,
        organization_id: 'org-placeholder',
        number: invoice.number || `INV-${Date.now()}`,
        purchase_order: invoice.purchase_order || '',
        status: invoice.status || 'unpaid',
        invoice_url: `https://pay.qonto.com/invoices/${id}`,
        contact_email: 'contact@example.com',
        terms_and_conditions: invoice.terms_and_conditions || '',
        discount_conditions: invoice.settings?.discount_conditions || '',
        late_payment_penalties: invoice.settings?.late_payment_penalties || '',
        legal_fixed_compensation: invoice.settings?.legal_fixed_compensation || '',
        header: invoice.header || '',
        footer: invoice.footer || '',
        currency: invoice.currency,
        total_amount: { value: totalAmount, currency: invoice.currency },
        total_amount_cents: parseFloat(totalAmount) * 100,
        vat_amount: { value: vatAmount, currency: invoice.currency },
        vat_amount_cents: parseFloat(vatAmount) * 100,
        issue_date: invoice.issue_date,
        due_date: invoice.due_date,
        performance_date: invoice.performance_date || '',
        created_at: createdAt,
        finalized_at: createdAt,
        paid_at: '',
        stamp_duty_amount: invoice.stamp_duty_amount || '',
        items: invoice.items.map((item) => ({
          ...item,
          unit_price_cents: parseFloat(item.unit_price.value) * 100,
          total_vat: { value: '0.00', currency: invoice.currency },
          total_vat_cents: 0,
          total_amount: { value: '0.00', currency: invoice.currency },
          total_amount_cents: 0,
          subtotal: { value: '0.00', currency: invoice.currency },
          subtotal_cents: 0,
        })),
        client: { id: invoice.client_id, name: 'Client Placeholder' } as QontoClient,
        payment_methods: [
          {
            beneficiary_name: 'Placeholder',
            bic: 'BIC123',
            iban: invoice.payment_methods.iban,
            type: 'transfer',
          },
        ],
        credit_notes_ids: [],
        organization: { id: 'org-placeholder', legal_name: 'Org Name' } as QontoOrganization,
        einvoicing_status: 'pending',
        welfare_fund: invoice.welfare_fund || { type: '', rate: '' },
        withholding_tax: invoice.withholding_tax || {
          reason: '',
          rate: '',
          payment_reason: '',
          amount: '',
        },
        payment_reporting: invoice.payment_reporting || { conditions: '', method: '' },
      },
    }
  }

  listClientInvoices = async (): Promise<IntegrationResponse<QontoClientInvoice[]>> => {
    const invoices = await this._clientInvoices.list<RecordFields>()
    return {
      data: invoices.map((row) => ({
        id: row.id,
        organization_id: 'org-placeholder',
        number: String(row.fields.number),
        purchase_order: String(row.fields.purchase_order),
        status: String(row.fields.status) as 'draft' | 'unpaid' | 'paid' | 'canceled',
        invoice_url: `https://pay.qonto.com/invoices/${row.id}`,
        contact_email: 'contact@example.com',
        terms_and_conditions: String(row.fields.terms_and_conditions),
        discount_conditions: '',
        late_payment_penalties: '',
        legal_fixed_compensation: '',
        header: String(row.fields.header),
        footer: String(row.fields.footer),
        currency: String(row.fields.currency),
        total_amount: {
          value: String(row.fields.total_amount_value),
          currency: String(row.fields.total_amount_currency),
        },
        total_amount_cents: parseFloat(String(row.fields.total_amount_value)) * 100,
        vat_amount: {
          value: String(row.fields.vat_amount_value),
          currency: String(row.fields.vat_amount_currency),
        },
        vat_amount_cents: parseFloat(String(row.fields.vat_amount_value)) * 100,
        issue_date: String(row.fields.issue_date),
        due_date: String(row.fields.due_date),
        performance_date: String(row.fields.performance_date),
        created_at: row.created_at,
        finalized_at: row.created_at,
        paid_at: '',
        stamp_duty_amount: '',
        items: [],
        client: { id: String(row.fields.client_id), name: 'Client Placeholder' } as QontoClient,
        payment_methods: [],
        credit_notes_ids: [],
        organization: { id: 'org-placeholder', legal_name: 'Org Name' } as QontoOrganization,
        einvoicing_status: 'pending',
        welfare_fund: { type: '', rate: '' },
        withholding_tax: { reason: '', rate: '', payment_reason: '', amount: '' },
        payment_reporting: { conditions: '', method: '' },
        attachment_id: String(row.fields.attachment_id),
      })),
    }
  }

  retrieveAttachment = async (
    attachmentId: string
  ): Promise<IntegrationResponse<QontoAttachment | undefined>> => {
    const attachment = await this._attachments.readById<RecordFields>(attachmentId)
    if (!attachment) {
      return { data: undefined }
    }
    return {
      data: {
        id: attachment.id,
        created_at: attachment.created_at,
        file_name: String(attachment.fields.file_name),
        file_size: parseInt(String(attachment.fields.file_size)),
        file_content_type: String(attachment.fields.file_content_type),
        url: String(attachment.fields.url),
      },
    }
  }
}

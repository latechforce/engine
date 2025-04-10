import type {
  QontoClient,
  QontoCreateClient,
  QontoClientInvoice,
  QontoCreateClientInvoice,
  QontoOrganization,
  QontoAttachment,
} from '/domain/integrations/Qonto/QontoTypes'
import type { IQontoIntegration } from '/adapter/spi/integrations/QontoSpi'
import { Database } from 'bun:sqlite'
import fsExtra from 'fs-extra'
import PDFDocument from 'pdfkit'
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'
import type { QontoConfig } from '/domain/integrations/Qonto/QontoConfig'

export class QontoIntegration implements IQontoIntegration {
  private db: Database

  constructor(public config: QontoConfig) {
    this.db = new Database(config.baseUrl ?? ':memory:')
    this.db.run(`CREATE TABLE IF NOT EXISTS Organizations (id TEXT PRIMARY KEY, legal_name TEXT)`)
    this.db.run(`
      CREATE TABLE IF NOT EXISTS Clients (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        email TEXT,
        vat_number TEXT,
        tax_identification_number TEXT,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        zip_code TEXT NOT NULL,
        country_code TEXT NOT NULL,
        billing_address TEXT,
        delivery_address TEXT,
        name TEXT,
        first_name TEXT,
        last_name TEXT,
        created_at TEXT NOT NULL,
        locale TEXT NOT NULL
      )
    `)
    this.db.run(`
      CREATE TABLE IF NOT EXISTS ClientInvoices (
        id TEXT PRIMARY KEY,
        client_id TEXT NOT NULL,
        issue_date TEXT NOT NULL,
        performance_date TEXT,
        due_date TEXT NOT NULL,
        status TEXT NOT NULL,
        number TEXT,
        purchase_order TEXT,
        terms_and_conditions TEXT,
        header TEXT,
        footer TEXT,
        currency TEXT NOT NULL,
        total_amount_value TEXT,
        total_amount_currency TEXT,
        vat_amount_value TEXT,
        vat_amount_currency TEXT,
        created_at TEXT NOT NULL,
        attachment_id TEXT
      )
    `)
    this.db.run(`
      CREATE TABLE IF NOT EXISTS Attachments (
        id TEXT PRIMARY KEY,
        file_name TEXT NOT NULL,
        file_size INTEGER NOT NULL,
        file_content_type TEXT NOT NULL,
        url TEXT NOT NULL,
        created_at TEXT NOT NULL
      )
    `)
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    const organization = this.db
      .query<QontoOrganization, string>('SELECT * FROM Organizations WHERE id = ?')
      .get(this.config.organisationSlug)
    if (!organization) {
      return { error: { status: 404, message: 'Organization not found' } }
    }
    return undefined
  }

  createOrganization = async (id: string, legalName: string): Promise<void> => {
    this.db.run(`INSERT INTO Organizations (id, legal_name) VALUES (?, ?)`, [id, legalName])
  }

  createClient = async (client: QontoCreateClient): Promise<IntegrationResponse<QontoClient>> => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`
    const createdAt = new Date().toISOString()
    const billingAddress = client.billing_address ? JSON.stringify(client.billing_address) : null
    const deliveryAddress = client.delivery_address ? JSON.stringify(client.delivery_address) : null
    this.db.run(
      `
      INSERT INTO Clients (
        id, type, email, vat_number, tax_identification_number, address, city, zip_code, 
        country_code, billing_address, delivery_address, name, first_name, last_name, 
        created_at, locale
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        id,
        client.type,
        client.email || null,
        client.vat_number || null,
        client.tax_identification_number || null,
        client.address,
        client.city,
        client.zip_code,
        client.country_code,
        billingAddress,
        deliveryAddress,
        client.name || null,
        client.first_name || null,
        client.last_name || null,
        createdAt,
        client.locale,
      ]
    )
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
    this.db.run(
      'INSERT INTO Attachments (id, file_name, file_size, file_content_type, url, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [
        mockAttachment.id,
        mockAttachment.file_name,
        mockAttachment.file_size,
        mockAttachment.file_content_type,
        mockAttachment.url,
        mockAttachment.created_at,
      ]
    )

    this.db.run(
      `
      INSERT INTO ClientInvoices (
        id, client_id, issue_date, performance_date, due_date, status, number, purchase_order, 
        terms_and_conditions, header, footer, currency, total_amount_value, total_amount_currency, 
        vat_amount_value, vat_amount_currency, created_at, attachment_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        id,
        invoice.client_id,
        invoice.issue_date,
        invoice.performance_date || null,
        invoice.due_date,
        invoice.status || 'unpaid',
        invoice.number,
        invoice.purchase_order || null,
        invoice.terms_and_conditions || null,
        invoice.header || null,
        invoice.footer || null,
        invoice.currency,
        invoice.items
          .reduce(
            (acc, item) => acc + parseFloat(item.unit_price.value) * parseFloat(item.quantity),
            0
          )
          .toFixed(2), // Total Amount Value
        invoice.currency,
        invoice.items
          .reduce(
            (acc, item) =>
              acc +
              parseFloat(item.unit_price.value) *
                parseFloat(item.quantity) *
                parseFloat(item.vat_rate),
            0
          )
          .toFixed(2), // VAT Amount Value
        invoice.currency,
        createdAt,
        attachmentId,
      ]
    )

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
        total_amount: { value: '0.00', currency: invoice.currency },
        total_amount_cents: 0,
        vat_amount: { value: '0.00', currency: invoice.currency },
        vat_amount_cents: 0,
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
    const result = this.db
      .query<
        QontoClientInvoice & {
          total_amount_value: string
          total_amount_currency: string
          vat_amount_value: string
          vat_amount_currency: string
        },
        []
      >('SELECT * FROM ClientInvoices')
      .all()
    return {
      data: result.map((row) => ({
        ...row,
        total_amount: { value: row.total_amount_value, currency: row.total_amount_currency },
        vat_amount: { value: row.vat_amount_value, currency: row.vat_amount_currency },
      })),
    }
  }

  retrieveAttachment = async (
    attachmentId: string
  ): Promise<IntegrationResponse<QontoAttachment | undefined>> => {
    const attachment = this.db
      .query<QontoAttachment, string>('SELECT * FROM Attachments WHERE id = ?')
      .get(attachmentId)
    return { data: attachment ?? undefined }
  }
}

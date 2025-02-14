import { format } from 'date-fns'
import type { IQontoIntegration } from '/adapter/spi/integrations/QontoSpi'
import type {
  QontoClient,
  QontoCreateClient,
  QontoCreateClientInvoice,
} from '/domain/integrations/Qonto'
import env from '/test/env'
import type BunTester from 'bun:test'

export function testQontoIntegration(
  { describe, it, expect }: typeof BunTester,
  integration: IQontoIntegration
) {
  let client: QontoClient

  describe('createClient', () => {
    it('should create a client', async () => {
      // GIVEN
      const createClient: QontoCreateClient = {
        name: 'John Doe',
        type: 'company',
        email: 'test@test.com',
        vat_number: 'FR12345678901',
        tax_identification_number: '83424148100029',
        currency: 'EUR',
        locale: 'FR',
        address: '1 rue de Paris',
        city: 'Paris',
        zip_code: '75001',
        country_code: 'FR',
      }

      // WHEN
      client = await integration.createClient(createClient)

      // THEN
      expect(client?.id).toBeDefined()
    })
  })

  describe('createClientInvoice', () => {
    it('should create a client invoices', async () => {
      // GIVEN
      const createClientInvoice: QontoCreateClientInvoice = {
        client_id: client.id,
        issue_date: format(new Date(), 'yyyy-MM-dd'),
        due_date: format(new Date(), 'yyyy-MM-dd'),
        status: 'draft',
        number: 'INV-001',
        currency: 'EUR',
        payment_methods: {
          iban: env.TEST_QONTO_IBAN,
        },
        items: [
          {
            title: 'Item 1',
            quantity: '1',
            unit_price: {
              value: '100',
              currency: 'EUR',
            },
            vat_rate: '0.2',
          },
        ],
      }

      // WHEN
      const invoice = await integration.createClientInvoice(createClientInvoice)

      // THEN
      expect(invoice?.id).toBeDefined()
    })
  })

  describe('listClientInvoices', () => {
    it('should list client invoices', async () => {
      // WHEN
      const invoices = await integration.listClientInvoices()

      // THEN
      expect(invoices.length > 0).toBeTruthy()
    })
  })
}

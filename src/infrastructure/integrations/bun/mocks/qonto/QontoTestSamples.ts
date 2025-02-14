import type {
  QontoClient,
  QontoCreateClient,
  QontoCreateClientInvoice,
} from '/domain/integrations/Qonto'
import { format } from 'date-fns'
import env from '/test/env'

export const qontoCreateClientSample: QontoCreateClient = {
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

export const qontoCreateClientInvoiceSample = (client: QontoClient): QontoCreateClientInvoice => ({
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
})

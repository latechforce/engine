import { addDays, format } from 'date-fns'
import type { GoCardlessCreatePayment } from '/domain/integrations/GoCardless'

export const qontoCreatePaymentSample: GoCardlessCreatePayment = {
  amount: 1000,
  description: 'Test payment',
  currency: 'EUR',
  charge_date: format(addDays(new Date(), 10), 'yyyy-MM-dd'),
  reference: 'TEST-REF-001',
  retry_if_possible: true,
  links: {
    mandate: 'MD0016HXWMR0ZN',
  },
}

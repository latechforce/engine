import { addDays, format } from 'date-fns'
import type {
  GoCardlessCreatePayment,
  GoCardlessListPayment,
} from '/domain/integrations/GoCardless'

export const goCardlessCreatePaymentSample: GoCardlessCreatePayment = {
  amount: 1000,
  description: 'Test payment',
  currency: 'EUR',
  charge_date: format(addDays(new Date(), 10), 'yyyy-MM-dd'),
  reference: 'TEST-REF-001',
  retry_if_possible: true,
  mandate: 'MD0016HXWMR0ZN',
}

export const goCardlessListPaymentsSample: GoCardlessListPayment = {
  limit: 10,
  status: 'pending_submission',
  mandate: 'MD0016HXWMR0ZN',
}

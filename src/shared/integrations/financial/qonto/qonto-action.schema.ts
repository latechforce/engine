import { z } from 'zod/v4'
import { baseIntegrationActionSchema } from '../../../../features/action/domain/schema/base.integration'

const baseQontoActionSchema = baseIntegrationActionSchema.extend({
  service: z.literal('qonto'),
})

const createClientQontoActionSchema = baseQontoActionSchema
  .extend({
    action: z.literal('create-client'),
    params: z.object({
      name: z.string().describe('Client name'),
      email: z.string().email().optional().describe('Client email'),
      phone: z.string().optional().describe('Client phone number'),
      address: z
        .object({
          street: z.string().describe('Street address'),
          city: z.string().describe('City'),
          postal_code: z.string().describe('Postal code'),
          country: z.string().describe('Country'),
        })
        .optional()
        .describe('Client address'),
      vat_number: z.string().optional().describe('VAT number'),
    }),
  })
  .meta({
    title: 'Create Client',
    description: 'Creates a new client in Qonto',
  })

const createInvoiceQontoActionSchema = baseQontoActionSchema
  .extend({
    action: z.literal('create-invoice'),
    params: z.object({
      client_id: z.string().describe('ID of the client for this invoice'),
      amount: z.number().positive().describe('Invoice total amount'),
      currency: z.string().default('EUR').describe('Invoice currency'),
      due_date: z.string().describe('Invoice due date (ISO 8601 format)'),
      items: z
        .array(
          z.object({
            description: z.string().describe('Item description'),
            quantity: z.number().positive().describe('Quantity'),
            unit_price: z.number().positive().describe('Unit price'),
          })
        )
        .describe('Invoice line items'),
      reference: z.string().optional().describe('Invoice reference number'),
      notes: z.string().optional().describe('Additional notes'),
    }),
  })
  .meta({
    title: 'Create Invoice',
    description: 'Creates a new invoice in Qonto',
  })

export const qontoActionSchema = z
  .union([createClientQontoActionSchema, createInvoiceQontoActionSchema])
  .meta({
    title: 'Qonto',
    description: 'The Qonto action is used to interact with the Qonto API',
  })

export type QontoActionSchema = z.infer<typeof qontoActionSchema>

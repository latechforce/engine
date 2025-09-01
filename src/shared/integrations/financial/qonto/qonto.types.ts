export type QontoTokenResponse = {
  access_token: string
  token_type: string
  expires_in?: number
  refresh_token?: string
  scope?: string
}

export type QontoClient = {
  id: string
  name: string
  email?: string
  phone?: string
  address?: {
    street: string
    city: string
    postal_code: string
    country: string
  }
  vat_number?: string
  created_at: string
  updated_at: string
}

export type QontoInvoice = {
  id: string
  number: string
  client_id: string
  amount: number
  currency: string
  due_date: string
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  items: Array<{
    description: string
    quantity: number
    unit_price: number
    amount: number
  }>
  created_at: string
  updated_at: string
}

export type Token = {
  id: number
  token_type: string
  access_token: string
  refresh_token: string | null
  expires_in: number | null
  scope: string | null
  created_at: Date
}

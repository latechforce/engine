export type CalendlyConfig = {
  /**
   * Personal access token for Calendly API authentication
   * See: https://developer.calendly.com/getting-started
   */
  client: {
    id: string
    secret: string
  }
  user: {
    accessToken: string
  }
}

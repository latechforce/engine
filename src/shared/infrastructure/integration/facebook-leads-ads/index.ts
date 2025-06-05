export class FacebookLeadsAdsIntegration {
  private readonly baseUrl = 'https://graph.facebook.com/v21.0'

  constructor(private readonly accessToken: string) {}
}

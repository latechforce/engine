import type { SendEmailGoogleMailActionConfig } from '/domain/entities/Action/integrations/googleMail/SendEmail'

export interface ISendEmailGoogleMailAction extends SendEmailGoogleMailActionConfig {
  integration: 'GoogleMail'
  action: 'SendEmail'
}

import { BaseAction, type BaseActionConfig, type BaseActionServices } from '../base'
import type { AutomationContext } from '../../Automation/Context'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'
import {
  Template,
  type ConvertToTemplateObject,
  type ConvertToTemplateObjectCompiled,
  type ConvertToTemplateObjectFilled,
} from '/domain/services/Template'
import type {
  GoogleMail,
  GoogleMailEmailOptions,
  GoogleMailEmailResponse,
} from '/domain/integrations/Google/GoogleMail'

type GoogleMailSendEmailAsTemplateObject = ConvertToTemplateObject<GoogleMailEmailOptions>
type GoogleMailSendEmailAsTemplateObjectCompiled =
  ConvertToTemplateObjectCompiled<GoogleMailEmailOptions>
type GoogleMailSendEmailAsTemplateObjectFilled =
  ConvertToTemplateObjectFilled<GoogleMailEmailOptions>

export interface SendEmailGoogleMailActionConfig extends BaseActionConfig {
  email: GoogleMailSendEmailAsTemplateObject
}

export interface SendEmailGoogleMailActionServices extends BaseActionServices {
  templateCompiler: TemplateCompiler
}

export interface SendEmailGoogleMailActionIntegrations {
  googleMail: GoogleMail
}

type Input = { email: GoogleMailEmailOptions }
type Output = GoogleMailEmailResponse

export class SendEmailGoogleMailAction extends BaseAction<Input, Output> {
  private _email: GoogleMailSendEmailAsTemplateObjectCompiled

  constructor(
    config: SendEmailGoogleMailActionConfig,
    services: SendEmailGoogleMailActionServices,
    private _integrations: SendEmailGoogleMailActionIntegrations
  ) {
    super(config, services)
    const { email } = config
    const { templateCompiler } = services
    this._email = templateCompiler.compileObject<GoogleMailSendEmailAsTemplateObjectCompiled>(email)
    _integrations.googleMail.getConfig()
  }

  protected _prepare = async (context: AutomationContext) => {
    return {
      email: Template.fillObject<GoogleMailSendEmailAsTemplateObjectFilled>(
        this._email,
        context.data
      ),
    }
  }

  protected _process = async (input: Input) => {
    return this._integrations.googleMail.sendEmail(input.email)
  }
}

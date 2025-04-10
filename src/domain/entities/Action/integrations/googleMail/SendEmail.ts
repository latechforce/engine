import { BaseAction, type BaseActionServices } from '/domain/entities/Action/base'
import type { AutomationContext } from '/domain/entities/Automation/Context'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'
import {
  Template,
  type ConvertToTemplateObjectCompiled,
  type ConvertToTemplateObjectFilled,
} from '/domain/services/Template'
import type {
  GoogleMail,
  GoogleMailEmailOptions,
  GoogleMailEmailResponse,
} from '/domain/integrations/Google/Mail'
import type { BaseActionIntegrationConfig } from '/domain/entities/Action/base'

type GoogleMailSendEmailAsTemplateObjectCompiled =
  ConvertToTemplateObjectCompiled<GoogleMailEmailOptions>
type GoogleMailSendEmailAsTemplateObjectFilled =
  ConvertToTemplateObjectFilled<GoogleMailEmailOptions>

export interface SendEmailGoogleMailActionConfig extends BaseActionIntegrationConfig {
  email: GoogleMailEmailOptions
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
    private _config: SendEmailGoogleMailActionConfig,
    services: SendEmailGoogleMailActionServices,
    private _integrations: SendEmailGoogleMailActionIntegrations
  ) {
    super(_config, services)
    const { email } = _config
    const { templateCompiler } = services
    const emailChecked = this._checkTemplateObject(email)
    this._email =
      templateCompiler.compileObject<GoogleMailSendEmailAsTemplateObjectCompiled>(emailChecked)
  }

  validate = async () => {
    const { googleMail } = this._integrations
    const { account } = this._config
    return googleMail.validate({ account, entity: 'Action', name: this.constructor.name })
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
    const { account } = this._config
    return this._integrations.googleMail.sendEmail(account, input.email)
  }
}

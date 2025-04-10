import {
  BaseAction,
  type BaseActionIntegrationConfig,
  type BaseActionServices,
} from '/domain/entities/Action/base'
import type { AutomationContext } from '/domain/entities/Automation/Context'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'
import type {
  GoCardlessCreatePayment,
  GoCardlessPayment,
  GoCardless,
} from '/domain/integrations/GoCardless'
import {
  Template,
  type ConvertToTemplateObjectCompiled,
  type ConvertToTemplateObjectFilled,
} from '/domain/services/Template'

type GoCardlessCreatePaymentAsTemplateObjectCompiled =
  ConvertToTemplateObjectCompiled<GoCardlessCreatePayment>
type GoCardlessCreatePaymentAsTemplateObjectFilled =
  ConvertToTemplateObjectFilled<GoCardlessCreatePayment>

export interface CreatePaymentGoCardlessActionConfig extends BaseActionIntegrationConfig {
  payment: GoCardlessCreatePayment
}

export interface CreatePaymentGoCardlessActionServices extends BaseActionServices {
  templateCompiler: TemplateCompiler
}

export interface CreatePaymentGoCardlessActionIntegrations {
  gocardless: GoCardless
}

type Input = { payment: GoCardlessCreatePayment }
type Output = GoCardlessPayment

export class CreatePaymentGoCardlessAction extends BaseAction<Input, Output> {
  private _payment: GoCardlessCreatePaymentAsTemplateObjectCompiled

  constructor(
    private _config: CreatePaymentGoCardlessActionConfig,
    services: CreatePaymentGoCardlessActionServices,
    private _integrations: CreatePaymentGoCardlessActionIntegrations
  ) {
    super(_config, services)
    const { payment } = _config
    const { templateCompiler } = services
    const paymentChecked = this._checkTemplateObject(payment)
    this._payment =
      templateCompiler.compileObject<GoCardlessCreatePaymentAsTemplateObjectCompiled>(
        paymentChecked
      )
  }

  validate = async () => {
    const { gocardless } = this._integrations
    const { account } = this._config
    return gocardless.validate({ account, entity: 'Action', name: this.constructor.name })
  }

  protected _prepare = async (context: AutomationContext) => {
    return {
      payment: Template.fillObject<GoCardlessCreatePaymentAsTemplateObjectFilled>(
        this._payment,
        context.data
      ),
    }
  }

  protected _process = async (input: Input) => {
    const { account } = this._config
    return this._integrations.gocardless.createPayment(account, input.payment)
  }
}

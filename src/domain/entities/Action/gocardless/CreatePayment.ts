import { BaseAction, type BaseActionConfig, type BaseActionServices } from '../base'
import type { AutomationContext } from '../../Automation/Context'
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

export interface CreatePaymentGoCardlessActionConfig extends BaseActionConfig {
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
    config: CreatePaymentGoCardlessActionConfig,
    services: CreatePaymentGoCardlessActionServices,
    private _integrations: CreatePaymentGoCardlessActionIntegrations
  ) {
    super(config, services)
    const { payment } = config
    const { templateCompiler } = services
    const paymentChecked = this._checkTemplateObject(payment)
    this._payment =
      templateCompiler.compileObject<GoCardlessCreatePaymentAsTemplateObjectCompiled>(
        paymentChecked
      )
    _integrations.gocardless.getConfig()
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
    return this._integrations.gocardless.createPayment(input.payment)
  }
}

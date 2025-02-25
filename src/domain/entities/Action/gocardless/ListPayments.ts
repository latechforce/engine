import { BaseAction, type BaseActionConfig, type BaseActionServices } from '../base'
import type { AutomationContext } from '../../Automation/Context'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'
import type {
  GoCardless,
  GoCardlessListPayment,
  GoCardlessPaymentList,
} from '/domain/integrations/GoCardless'
import {
  Template,
  type ConvertToTemplateObjectCompiled,
  type ConvertToTemplateObjectFilled,
} from '/domain/services/Template'

type GoCardlessListPaymentsAsTemplateObjectCompiled =
  ConvertToTemplateObjectCompiled<GoCardlessListPayment>
type GoCardlessListPaymentsAsTemplateObjectFilled =
  ConvertToTemplateObjectFilled<GoCardlessListPayment>

export interface ListPaymentsGoCardlessActionConfig extends BaseActionConfig {
  params: GoCardlessListPayment
}

export interface ListPaymentsGoCardlessActionServices extends BaseActionServices {
  templateCompiler: TemplateCompiler
}

export interface ListPaymentsGoCardlessActionIntegrations {
  gocardless: GoCardless
}

type Input = { params: GoCardlessListPayment }
type Output = GoCardlessPaymentList

export class ListPaymentsGoCardlessAction extends BaseAction<Input, Output> {
  private _params: GoCardlessListPaymentsAsTemplateObjectCompiled

  constructor(
    config: ListPaymentsGoCardlessActionConfig,
    services: ListPaymentsGoCardlessActionServices,
    private _integrations: ListPaymentsGoCardlessActionIntegrations
  ) {
    super(config, services)
    const { params } = config
    const { templateCompiler } = services
    const paramsChecked = this._checkTemplateObject(params)
    this._params =
      templateCompiler.compileObject<GoCardlessListPaymentsAsTemplateObjectCompiled>(paramsChecked)
    _integrations.gocardless.getConfig()
  }

  protected _prepare = async (context: AutomationContext) => {
    return {
      params: Template.fillObject<GoCardlessListPaymentsAsTemplateObjectFilled>(
        this._params,
        context.data
      ),
    }
  }

  protected _process = async (input: Input) => {
    return this._integrations.gocardless.listPayments(input.params)
  }
}

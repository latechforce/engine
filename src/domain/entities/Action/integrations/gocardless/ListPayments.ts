import { type BaseActionServices } from '/domain/entities/Action/base'
import type { AutomationContext } from '/domain/entities/Automation/Context'
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
import { BaseIntegrationAction, type BaseActionIntegrationConfig } from '../base'

type GoCardlessListPaymentsAsTemplateObjectCompiled =
  ConvertToTemplateObjectCompiled<GoCardlessListPayment>
type GoCardlessListPaymentsAsTemplateObjectFilled =
  ConvertToTemplateObjectFilled<GoCardlessListPayment>

export interface ListPaymentsGoCardlessActionConfig extends BaseActionIntegrationConfig {
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

export class ListPaymentsGoCardlessAction extends BaseIntegrationAction<Input, Output> {
  private _params: GoCardlessListPaymentsAsTemplateObjectCompiled

  constructor(
    private _config: ListPaymentsGoCardlessActionConfig,
    services: ListPaymentsGoCardlessActionServices,
    private _integrations: ListPaymentsGoCardlessActionIntegrations
  ) {
    super(_config, services)
    const { params } = _config
    const { templateCompiler } = services
    const paramsChecked = this._checkTemplateObject(params)
    this._params =
      templateCompiler.compileObject<GoCardlessListPaymentsAsTemplateObjectCompiled>(paramsChecked)
  }

  validate = async () => {
    const { gocardless } = this._integrations
    const { account } = this._config
    return gocardless.validate({ account, entity: 'Action', name: this.constructor.name })
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
    const { account } = this._config
    return this._integrations.gocardless.listPayments(account, input.params)
  }
}

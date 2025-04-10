import { type BaseActionIntegrationConfig } from '/domain/entities/Action/base'
import type { AutomationContext } from '/domain/entities/Automation/Context'
import { Template } from '/domain/services/Template'
import type { PappersEntreprise } from '/domain/integrations/Pappers/PappersTypes'
import {
  BasePappersAction,
  type BasePappersActionIntegrations,
  type BasePappersActionServices,
} from './base'

export interface GetCompanyPappersActionConfig extends BaseActionIntegrationConfig {
  siret: string
}

export type GetCompanyPappersActionServices = BasePappersActionServices

export type GetCompanyPappersActionIntegrations = BasePappersActionIntegrations

type Input = { siret: string }
type Output = PappersEntreprise

export class GetCompanyPappersAction extends BasePappersAction<Input, Output> {
  private _siret: Template

  constructor(
    config: GetCompanyPappersActionConfig,
    services: GetCompanyPappersActionServices,
    integrations: GetCompanyPappersActionIntegrations
  ) {
    super(config, services, integrations)
    const { siret } = config
    const { templateCompiler } = services
    this._siret = templateCompiler.compile(siret)
  }

  protected _prepare = async (context: AutomationContext) => {
    return { siret: this._siret.fill(context.data) }
  }

  protected _process = async (input: Input) => {
    const { account } = this._config
    const company = await this._integrations.pappers.getCompany(account, input.siret)
    if (!company) {
      throw new Error(`Company not found for siret "${input.siret}"`)
    }
    return company
  }
}

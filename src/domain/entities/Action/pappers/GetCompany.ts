import { type BaseActionConfig } from '../base'
import type { AutomationContext } from '../../Automation/Context'
import { Template } from '/domain/services/Template'
import type { PappersEntreprise } from '/domain/integrations/Pappers/PappersTypes'
import {
  BasePappersAction,
  type BasePappersActionIntegrations,
  type BasePappersActionServices,
} from './base'

export interface GetCompanyPappersActionConfig extends BaseActionConfig {
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
    const company = await this._integrations.pappers.getCompany(input.siret)
    if (!company) {
      throw new Error(`Company not found for siret "${input.siret}"`)
    }
    return company
  }
}

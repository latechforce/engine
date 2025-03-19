import { type BaseActionConfig } from '../base'
import type { AutomationContext } from '/domain/entities/Automation/Context'
import { Template } from '/domain/services/Template'
import type { QontoAttachment } from '/domain/integrations/Qonto/QontoTypes'
import {
  BaseQontoAction,
  type BaseQontoActionIntegrations,
  type BaseQontoActionServices,
} from './base'

export type RetrieveAttachmentQontoActionServices = BaseQontoActionServices

export type RetrieveAttachmentQontoActionIntegrations = BaseQontoActionIntegrations

export interface RetrieveAttachmentQontoActionConfig extends BaseActionConfig {
  attachmentId: string
}

type Input = { attachmentId: string }
type Output = QontoAttachment

export class RetrieveAttachmentQontoAction extends BaseQontoAction<Input, Output> {
  private _attachmentId: Template

  constructor(
    config: RetrieveAttachmentQontoActionConfig,
    services: RetrieveAttachmentQontoActionServices,
    integrations: RetrieveAttachmentQontoActionIntegrations
  ) {
    super(config, services, integrations)
    const { attachmentId } = config
    const { templateCompiler } = services
    this._attachmentId = templateCompiler.compile(attachmentId)
  }

  protected _prepare = async (context: AutomationContext) => {
    return {
      attachmentId: this._attachmentId.fill(context.data),
    }
  }

  protected _process = async (input: Input) => {
    const attachment = await this._integrations.qonto.retrieveAttachment(input.attachmentId)
    if (!attachment) {
      throw new Error(`Attachment ${input.attachmentId} not found`)
    }
    return attachment
  }
}

import { BaseAction, type BaseActionConfig, type BaseActionServices } from '../base'
import type { AutomationContext } from '../../Automation/Context'
import type { TemplateCompiler } from '../../../services/TemplateCompiler'
import type { Qonto, QontoAttachment } from '../../../integrations/Qonto'
import { Template } from '../../../services/Template'

export interface RetrieveAttachmentQontoActionConfig extends BaseActionConfig {
  attachmentId: string
}

export interface RetrieveAttachmentQontoActionServices extends BaseActionServices {
  templateCompiler: TemplateCompiler
}

export interface RetrieveAttachmentQontoActionIntegrations {
  qonto: Qonto
}

type Input = { attachmentId: string }
type Output = QontoAttachment

export class RetrieveAttachmentQontoAction extends BaseAction<Input, Output> {
  private _attachmentId: Template

  constructor(
    config: RetrieveAttachmentQontoActionConfig,
    services: RetrieveAttachmentQontoActionServices,
    private _integrations: RetrieveAttachmentQontoActionIntegrations
  ) {
    super(config, services)
    const { attachmentId } = config
    const { templateCompiler } = services
    this._attachmentId = templateCompiler.compile(attachmentId)
    _integrations.qonto.getConfig()
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

import type { Queue } from '../../../../services/Queue'
import { BaseTrigger, type BaseTriggerIntegrationConfig } from '../../base'
import type { Jotform } from '../../../../integrations/Jotform'
import type { Server } from '../../../../services/Server'
import type { System } from '../../../../services/System'
import type { AutomationContext } from '../../../Automation/Context'
import type { PostRequest } from '../../../Request'
import { JsonResponse } from '../../../Response/Json'

export type FormWebhookReceivedTriggerConfig = BaseTriggerIntegrationConfig & {
  formId: string
}

export interface FormWebhookReceivedTriggerServices {
  queue: Queue
  server: Server
  system: System
}

export interface FormWebhookReceivedTriggerIntegrations {
  jotform: Jotform
}

export class FormWebhookReceivedTrigger extends BaseTrigger<FormWebhookReceivedTriggerConfig> {
  constructor(
    config: FormWebhookReceivedTriggerConfig,
    private _services: FormWebhookReceivedTriggerServices,
    private _integrations: FormWebhookReceivedTriggerIntegrations
  ) {
    super(config)
  }

  validate = async () => {
    const { jotform } = this._integrations
    const { account } = this._config
    return jotform.validate({ account, entity: 'Trigger', name: 'FormWebhookReceivedTrigger' })
  }

  init = async (run: (triggerData: object) => Promise<AutomationContext>) => {
    const { queue, server, system } = this._services
    const { automation, account, formId } = this._config
    const { jotform } = this._integrations
    const triggerPath =
      '/' + system.joinPath('api', 'trigger', 'jotform', 'form-webhook-received', automation)
    await server.post(triggerPath, this.onTriggerCalled)
    const triggerUrl = system.joinPath(server.baseUrl, triggerPath)
    const listWebhookResponse = await jotform.listWebhooks(account, formId)
    const webhookExist = Object.values(listWebhookResponse.content).find(
      (webhook) => webhook === triggerUrl
    )
    if (!webhookExist) {
      await jotform.addWebhook(account, {
        formId: formId,
        webhookUrl: triggerUrl,
      })
    }

    queue.job(automation, run)
  }

  onTriggerCalled = async (request: PostRequest) => {
    const { queue } = this._services
    const { automation } = this._config
    await queue.add(automation, request.getBodyAsObject())
    return new JsonResponse({ success: true })
  }
}

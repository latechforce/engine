import { ServiceAction } from './action/service-action.entity'
import type { Connection } from './connection.entity'
import { IntegrationTrigger } from './trigger/integration-trigger.entity'
import { ServiceTrigger } from './trigger/service-trigger.entity'
import type { AutomationSchema } from '@/domain/validator/automation.validator'
import type { Trigger } from './trigger'
import { IntegrationAction } from './action/integration-action.entity'
import type { Action } from './action'

export class Automation {
  public readonly trigger: Trigger
  public readonly actions: Action[]

  constructor(
    public readonly schema: AutomationSchema,
    public readonly connections: Connection[]
  ) {
    const { trigger } = schema
    if ('account' in trigger) {
      const connection = this.getAccount(trigger.account, trigger.service)
      if (!connection) {
        throw new Error(
          `Account "${trigger.account}" not found for trigger "${trigger.service}/${trigger.event}"`
        )
      }
      this.trigger = new IntegrationTrigger(trigger, this.schema.name, connection)
    } else {
      this.trigger = new ServiceTrigger(trigger, this.schema.name)
    }
    this.actions = schema.actions.map((action) => {
      if ('account' in action) {
        const connection = this.getAccount(action.account, action.service)
        if (!connection) {
          throw new Error(
            `Account "${action.account}" not found for action "${action.service}/${action.action}"`
          )
        }
        return new IntegrationAction(action, schema, connection)
      } else {
        return new ServiceAction(action, schema)
      }
    })
  }

  private getAccount(nameOrId: string | number, service: string) {
    return this.connections.find(
      (connection) =>
        (connection.schema.id === nameOrId || connection.schema.name === nameOrId) &&
        connection.schema.service === service
    )
  }
}

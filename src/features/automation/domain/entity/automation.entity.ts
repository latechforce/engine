// Action domain imports
import type { Action } from '@/action/domain/entity'
import { IntegrationAction } from '@/action/domain/entity/integration-action.entity'
import { ServiceAction } from '@/action/domain/entity/service-action.entity'

// Connection domain imports
import type { Connection } from '@/connection/domain/entity/connection.entity'

// Trigger domain imports
import type { Trigger } from '@/trigger/domain/entity/trigger.entity'
import { IntegrationTrigger } from '@/trigger/domain/entity/integration-trigger.entity'
import { ServiceTrigger } from '@/trigger/domain/entity/service-trigger.entity'

// Automation domain imports
import type { AutomationSchema } from '@/automation/domain/schema/automation.schema'

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

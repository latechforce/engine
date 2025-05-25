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
    if ('connection' in trigger) {
      const connection = this.getConnection(trigger.connection)
      if (!connection) {
        throw new Error(
          `Connection "${trigger.connection}" not found for trigger "${trigger.service}/${trigger.event}"`
        )
      }
      this.trigger = new IntegrationTrigger(trigger, connection)
    } else {
      this.trigger = new ServiceTrigger(trigger)
    }
    this.actions = schema.actions.map((action) => {
      if ('connection' in action) {
        const connection = this.getConnection(action.connection)
        if (!connection) {
          throw new Error(
            `Connection "${action.connection}" not found for action "${action.service}/${action.action}"`
          )
        }
        return new IntegrationAction(action, schema, connection)
      } else {
        return new ServiceAction(action, schema)
      }
    })
  }

  private getConnection(nameOrId: string | number) {
    return this.connections.find(
      (connection) => connection.schema.id === nameOrId || connection.schema.name === nameOrId
    )
  }
}

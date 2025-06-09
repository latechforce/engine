// Action domain imports
import type { Action } from '../../../action/domain/entity'
import { IntegrationAction } from '../../../action/domain/entity/integration-action.entity'
import { ServiceAction } from '../../../action/domain/entity/service-action.entity'

// Connection domain imports
import type { Connection } from '../../../connection/domain/entity/connection.entity'

// Trigger domain imports
import type { Trigger } from '../../../trigger/domain/entity/trigger.entity'
import { IntegrationTrigger } from '../../../trigger/domain/entity/integration-trigger.entity'
import { ServiceTrigger } from '../../../trigger/domain/entity/service-trigger.entity'

// Automation domain imports
import type { AutomationSchema } from '../schema/automation.schema'
import type { ActionSchema } from '../../../action/domain/schema/action.schema'
import type { TriggerSchema } from '../../../trigger/domain/schema/trigger.schema'

export class Automation {
  public readonly trigger: Trigger
  public readonly actions: Action[]

  constructor(
    public readonly schema: AutomationSchema,
    public readonly connections: Connection[]
  ) {
    const { trigger } = schema
    this.validateActionsSchema(schema.actions)
    this.trigger = this.mapTrigger(trigger)
    this.actions = schema.actions.map((action) => this.mapAction(action))
  }

  validateActionsSchema(actions: ActionSchema[]) {
    const actionNames = new Set<string>()
    const pathNames = new Set<string>()
    for (const action of actions) {
      if (actionNames.has(action.name)) {
        throw new Error(`Duplicate action name: ${action.name}`)
      }
      actionNames.add(action.name)
      if (action.service === 'filter' && action.action === 'split-into-paths') {
        for (const path of action.splitIntoPathsFilter) {
          if (pathNames.has(path.name)) {
            throw new Error(`Duplicate path name: ${path.name}`)
          }
          pathNames.add(path.name)
          this.validateActionsSchema(path.actions)
        }
      }
    }
  }

  private getAccount(nameOrId: string | number, service: string) {
    return this.connections.find(
      (connection) =>
        (connection.schema.id === nameOrId || connection.schema.name === nameOrId) &&
        connection.schema.service === service
    )
  }

  private mapTrigger(trigger: TriggerSchema): Trigger {
    if ('account' in trigger) {
      const connection = this.getAccount(trigger.account, trigger.service)
      if (!connection) {
        throw new Error(
          `Account "${trigger.account}" not found for trigger "${trigger.service}/${trigger.event}"`
        )
      }
      return new IntegrationTrigger(trigger, this, connection)
    } else {
      return new ServiceTrigger(trigger, this)
    }
  }

  private mapAction(action: ActionSchema): Action {
    if ('account' in action) {
      const connection = this.getAccount(action.account, action.service)
      if (!connection) {
        throw new Error(
          `Account "${action.account}" not found for action "${action.service}/${action.action}"`
        )
      }
      return new IntegrationAction(action, this.schema.name, connection)
    } else {
      return new ServiceAction(action, this.schema.name)
    }
  }

  findPath(pathName: string) {
    const keys = pathName.split('.')
    if (keys.length < 2) {
      throw new Error('Path name is required')
    }
    const actionPathName = keys.slice(-2).join('.')
    const path = this.findPathFromName(actionPathName, this.schema.actions)
    if (path) {
      return path
    } else {
      throw new Error(`Path "${pathName}" not found in automation "${this.schema.name}"`)
    }
  }

  private findPathFromName(
    actionPathName: string,
    actions: ActionSchema[]
  ):
    | {
        actionName: string
        pathName: string
        actions: Action[]
      }
    | undefined {
    const [actionName, pathName] = actionPathName.split('.')
    for (const action of actions) {
      if (
        action.name === actionName &&
        action.service === 'filter' &&
        action.action === 'split-into-paths'
      ) {
        const path = action.splitIntoPathsFilter.find((path) => path.name === pathName)
        if (path) {
          return {
            actionName: action.name,
            pathName: path.name,
            actions: path.actions.map((action) => this.mapAction(action)),
          }
        }
        for (const { actions } of action.splitIntoPathsFilter) {
          return this.findPathFromName(actionPathName, actions)
        }
      }
    }
  }
}

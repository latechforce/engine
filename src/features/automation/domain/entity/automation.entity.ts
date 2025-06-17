import type { ConnectionSchema } from '../../../../integrations/connection.schema'
import type { AutomationSchema } from '../schema/automation.schema'
import type { ActionSchema } from '../../../action/domain/schema/action.schema'
import type { TriggerSchema } from '../../../trigger/domain/schema/trigger.schema'

export class Automation {
  public readonly trigger: TriggerSchema
  public readonly actions: ActionSchema[]

  constructor(
    public readonly schema: AutomationSchema,
    public readonly connections: ConnectionSchema[]
  ) {
    const { trigger } = schema
    this.validateActionsSchema(schema.actions)
    if ('account' in trigger) {
      const triggerConnection = this.getAccount(trigger.account, trigger.service)
      if (!triggerConnection) {
        throw new Error(
          `Account "${trigger.account}" not found for trigger "${trigger.service}/${trigger.event}"`
        )
      }
    }
    this.trigger = trigger
    this.actions = schema.actions
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
        (connection.id === nameOrId || connection.name === nameOrId) &&
        connection.service === service
    )
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
        actions: ActionSchema[]
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
            actions: path.actions,
          }
        }
        for (const { actions } of action.splitIntoPathsFilter) {
          return this.findPathFromName(actionPathName, actions)
        }
      }
    }
  }
}

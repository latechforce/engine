import { Action } from './action.entity'
import { Trigger } from './trigger.entity'
import type { AutomationSchema, ResponseHttpActionSchema } from '@/types'

export class Automation {
  public readonly trigger: Trigger
  public readonly actions: Action[]

  constructor(public readonly schema: AutomationSchema) {
    this.trigger = new Trigger(schema.trigger)
    this.actions = schema.actions.map((action) => new Action(action, schema))
  }

  get name() {
    return this.schema.name
  }

  private isResponseHttpAction(action: Action): action is Action<ResponseHttpActionSchema> {
    return action.schema.service === 'http' && action.schema.action === 'response'
  }

  getResponseAction(): Action<ResponseHttpActionSchema> | undefined {
    return this.actions.find(this.isResponseHttpAction)
  }
}

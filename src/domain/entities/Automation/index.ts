import type { Logger } from '/domain/services/Logger'
import type { Action } from '../Action'
import type { Trigger } from '../Trigger'
import { AutomationContext } from './Context'
import type { ConfigError } from '/domain/entities/Error/Config'
import type { Monitor } from '/domain/services/Monitor'
import type { IdGenerator } from '/domain/services/IdGenerator'
import { AutomationHistory } from './History'
import type { Database } from '/domain/services/Database'

export interface AutomationConfig {
  name: string
  description?: string
}

interface AutomationServices {
  logger: Logger
  monitor: Monitor
  idGenerator: IdGenerator
  database: Database
}

interface AutomationEntities {
  actions: Action[]
  trigger: Trigger
}

export class Automation {
  private _history: AutomationHistory

  constructor(
    private _config: AutomationConfig,
    private _services: AutomationServices,
    private _entities: AutomationEntities
  ) {
    this._history = new AutomationHistory(this._services)
  }

  get name() {
    return this._config.name
  }

  get history() {
    return this._history
  }

  get entities() {
    return this._entities
  }

  validate = async (): Promise<ConfigError[]> => {
    const { trigger, actions } = this._entities
    const errors: Promise<ConfigError[]>[] = []
    errors.push(trigger.validate())
    for (const action of actions) errors.push(action.validate())
    return Promise.all(errors).then((errors) => errors.flat())
  }

  init = async () => {
    const { trigger, actions } = this._entities
    const { logger } = this._services
    await this._history.init()
    await trigger.init(this.run)
    logger.debug(`initializing automation "${this.name}"`)
    for (const action of actions) await action.init()
  }

  run = async (triggerData: object) => {
    const { actions } = this._entities
    const { logger } = this._services
    logger.info(`start automation "${this.name}"`)
    const id = await this._history.create({
      automation_name: this.name,
      trigger_data: JSON.stringify(triggerData),
      actions_data: JSON.stringify([]),
      status: 'running',
    })
    const context = new AutomationContext(id, triggerData)
    logger.debug(`running automation "${this.name}" with id "${id}"`)
    for (const action of actions) {
      const result = await action.execute(context)
      await this._history.updateActions(id, context.run.actions)
      if (!result.success) break
    }
    await this._history.updateStatus(id, context.status)
    logger.info(`finish automation "${this.name}" with status "${context.status}"`)
    return context
  }
}

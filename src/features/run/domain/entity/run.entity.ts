import crypto from 'crypto'
import type { AutomationSchema } from '../../../../features/automation/domain/schema/automation.schema'
import type { IntegrationError } from '../../../../features/action/domain/value-object/integration-error.value.object'
import type { ServiceError } from '../../../../features/action/domain/value-object/service-error.value-object'

export class Run {
  constructor(
    public readonly automation_schema: AutomationSchema,
    public readonly data: Record<string, Record<string, unknown>> = {},
    private _status: 'playing' | 'success' | 'stopped' | 'filtered' = 'playing',
    public readonly id: string = crypto.randomUUID(),
    public readonly createdAt: Date = new Date(),
    private _updatedAt: Date = new Date(),
    private _lastActionName: string | null = null,
    private _errorMessage: string | null = null
  ) {}

  get status() {
    return this._status
  }

  get lastActionName() {
    return this._lastActionName
  }

  get errorMessage() {
    return this._errorMessage
  }

  get updatedAt() {
    return this._updatedAt
  }

  actionSuccess(actionName: string, result: Record<string, unknown>) {
    this.data[actionName] = result
    this._updatedAt = new Date()
    this._lastActionName = actionName
  }

  actionPathSuccess(actionPath: string, result: Record<string, unknown>) {
    const pathSegments = actionPath.split('.')
    if (pathSegments.length < 2) {
      throw new Error('Invalid action path')
    }
    let current = this.data
    for (let i = 0; i < pathSegments.length - 1; i++) {
      const key = pathSegments[i]
      if (!key) {
        throw new Error('Invalid action path')
      }
      if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
        current[key] = {}
      }
      current = current[key] as Record<string, Record<string, unknown>>
    }
    const finalKey = pathSegments[pathSegments.length - 1]
    current[finalKey!] = { ...current[finalKey!], ...result }
    this._updatedAt = new Date()
    this._lastActionName = pathSegments[0]!
  }

  success() {
    if (this._status === 'playing') {
      this._status = 'success'
    }
  }

  filter(actionName: string, result: Record<string, unknown>) {
    if (this._status === 'playing') {
      this.data[actionName] = result
      this._updatedAt = new Date()
      this._lastActionName = actionName
      this._status = 'filtered'
    }
  }

  stop(actionName: string, error: IntegrationError | ServiceError) {
    if (this._status === 'playing' || this._status === 'filtered') {
      this.data[actionName] = error
      this._updatedAt = new Date()
      this._lastActionName = actionName
      this._errorMessage = error.message
      this._status = 'stopped'
    }
  }

  getLastActionData() {
    if (!this.lastActionName) {
      throw new Error('No last action name')
    }
    const data = this.data[this.lastActionName]
    if (!data) {
      throw new Error('No last action data')
    }
    return data
  }

  getLastAction() {
    const action = this.automation_schema.actions.find(
      (action) => action.name === this.lastActionName
    )
    if (!action) {
      throw new Error('Action not found')
    }
    return action
  }
}

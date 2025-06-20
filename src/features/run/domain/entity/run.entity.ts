import crypto from 'crypto'
import type { IntegrationError } from '../../../action/domain/value-object/integration-error.value-object'
import type { ServiceError } from '../../../../features/action/domain/value-object/service-error.value-object'
import type { Steps } from '../value-object.ts/step.value-object'
import type { ActionStep } from '../value-object.ts/action-step.value-object'
import type { ActionSchema } from '../../../../features/action/domain/schema/action.schema'
import type { PathStep } from '../value-object.ts/paths-step.value-object'
import type { SplitIntoPathsFilterActionSchema } from '../../../../features/action/domain/schema/filter/split-into-paths.schema'

export class Run {
  constructor(
    public readonly automation_id: number,
    public readonly steps: Steps,
    public readonly form_id: number | null = null,
    private _status: 'playing' | 'success' | 'stopped' | 'filtered' = 'playing',
    public readonly id: string = crypto.randomUUID(),
    public readonly createdAt: Date = new Date(),
    private _updatedAt: Date = new Date()
  ) {}

  get status() {
    return this._status
  }

  get updatedAt() {
    return this._updatedAt
  }

  clone(): Run {
    return new Run(
      this.automation_id,
      JSON.parse(JSON.stringify(this.steps)),
      this.form_id,
      this._status,
      crypto.randomUUID(),
      this.createdAt,
      this._updatedAt
    )
  }

  startActionStep(actionPath: string, schema: ActionSchema, input: Record<string, unknown>) {
    const pathSegments = actionPath.split('.')
    if (pathSegments.length < 2) {
      this.steps.push({
        createdAt: new Date().toISOString(),
        schema,
        input,
        output: undefined,
        error: undefined,
      })
      this._updatedAt = new Date()
    } else {
      const [actionName, pathName, ...segments] = pathSegments
      const step = this.getActionStepOrThrow(actionName!)
      if ('paths' in step) {
        const path = step.paths.find((path) => path.schema.name === pathName)
        if (!path) {
          throw new Error('Path step not found')
        }
        if (segments.length < 2) {
          path.actions.push({
            createdAt: new Date().toISOString(),
            schema,
            input,
            output: undefined,
            error: undefined,
          })
          this._updatedAt = new Date()
        } else {
          this.startActionStep(segments.join('.'), schema, input)
        }
      } else {
        throw new Error('Action step not found')
      }
    }
  }

  startActionPathsStep(schema: SplitIntoPathsFilterActionSchema, paths: PathStep[]) {
    this.steps.push({
      createdAt: new Date().toISOString(),
      schema: {
        name: schema.name,
        service: schema.service,
        action: schema.action,
      },
      paths,
    })
    this._updatedAt = new Date()
  }

  getActionStep(actionPath: string, steps?: ActionStep[]): ActionStep | undefined {
    const pathSegments = actionPath.split('.')
    if (pathSegments.length < 2) {
      const actionName = pathSegments[0]!
      for (const step of steps ?? this.steps) {
        if (('input' in step || 'paths' in step) && step.schema.name === actionName) {
          return step
        }
      }
      return
    } else {
      const [actionName, pathName, ...segments] = pathSegments
      const step = this.getActionStep(actionName!)
      if (!step) return
      if ('paths' in step) {
        const path = step.paths.find((path) => path.schema.name === pathName)
        if (!path) {
          throw new Error('Path step not found')
        }
        if (segments.length > 0) {
          return this.getActionStep(segments.join('.'), path.actions)
        }
        return step
      }
    }
  }

  getActionStepOrThrow(actionPath: string): ActionStep {
    const step = this.getActionStep(actionPath)
    if (!step) throw new Error(`Action step "${actionPath}" not found`)
    return step
  }

  getStepsOutput() {
    const [trigger, ...actions] = this.steps
    const buildOutput = (steps: ActionStep[]): Record<string, unknown> => {
      return steps.reduce((acc: Record<string, unknown>, step) => {
        if ('paths' in step) {
          acc[step.schema.name] = step.paths.reduce((acc: Record<string, unknown>, path) => {
            acc[path.schema.name] = buildOutput(path.actions)
            return acc
          }, {})
        } else if ('action' in step.schema) {
          acc[step.schema.name] = step.output ?? {}
        }
        return acc
      }, {})
    }
    const output = buildOutput(actions)
    return {
      ...output,
      trigger: trigger.output,
    }
  }

  isStepSucceed(actionPath: string) {
    const step = this.getActionStep(actionPath)
    if (!step) return false
    if ('output' in step) return !!step.output
    return true
  }

  successActionStep(actionPath: string, output: Record<string, unknown>) {
    const step = this.getActionStepOrThrow(actionPath)
    if ('output' in step) step.output = output
    this._updatedAt = new Date()
  }

  filterActionStep(actionPath: string, result: Record<string, unknown>) {
    if (this._status === 'playing') {
      const step = this.getActionStepOrThrow(actionPath)
      if ('output' in step) step.output = result
      this._updatedAt = new Date()
      this._status = 'filtered'
    }
  }

  stopActionStep(actionPath: string, error: IntegrationError | ServiceError) {
    if (this._status === 'playing' || this._status === 'filtered') {
      const step = this.getActionStep(actionPath)
      if (step && 'error' in step) step.error = error
      this._updatedAt = new Date()
      this._status = 'stopped'
    }
  }

  runSucceed() {
    if (this._status === 'playing') {
      this._status = 'success'
    }
  }

  getLastActionStepData() {
    const buildData = (step: ActionStep): Record<string, unknown> => {
      if ('paths' in step) {
        return step.paths.reduce((acc: Record<string, unknown>, path) => {
          const lastAction = path.actions[path.actions.length - 1]!
          if (lastAction) {
            acc[path.schema.name] = buildData(lastAction)
          }
          return acc
        }, {})
      } else {
        return step.output ?? {}
      }
    }
    const lastAction = this.getLastActionStep()
    if (!lastAction) {
      return {}
    }
    return buildData(lastAction)
  }

  getLastActionStep() {
    const [, ...actions] = this.steps
    return actions[actions.length - 1]
  }

  getErrorMessage() {
    const getError = (steps: ActionStep[]) => {
      for (const step of steps) {
        if ('error' in step) return step.error
        if ('paths' in step) return getError(step.paths.flatMap((path) => path.actions))
      }
    }
    const [, ...actions] = this.steps
    const error = getError(actions)
    if (error) {
      return error.message
    }
    return undefined
  }
}

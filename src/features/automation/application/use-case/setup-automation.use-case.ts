import { injectable, inject } from 'inversify'
import { join } from 'path'
import { z } from 'zod'
import TYPES from '../../../../shared/application/di/types'
import type { SetupActionUseCase } from '../../../action/application/use-case/setup-action.use-case'
import type { IRunRepository } from '../../../run/domain/repository-interface/run-repository.interface'
import { type Run } from '../../../run/domain/entity/run.entity'
import type { SetupTriggerUseCase } from '../../../trigger/application/use-case/setup-trigger.use-case'
import type { Automation } from '../../domain/entity/automation.entity'
import type { IAutomationRepository } from '../../domain/repository-interface/automation-repository.interface'
import type { RunAutomationUseCase } from './run-automation.use-case'
import type { SchemaObject } from 'ajv'
import type { App } from '../../../app/domain/entity/app.entity'
import type { ResponseHttpActionSchema } from '../../../action/domain/schema/http/response.schema'

@injectable()
export class SetupAutomationUseCase {
  constructor(
    @inject(TYPES.Run.Repository)
    private readonly runRepository: IRunRepository,
    @inject(TYPES.Trigger.UseCase.Setup)
    private readonly setupTriggerUseCase: SetupTriggerUseCase,
    @inject(TYPES.Action.UseCase.Setup)
    private readonly setupActionUseCase: SetupActionUseCase,
    @inject(TYPES.Automation.UseCase.Run)
    private readonly runAutomationUseCase: RunAutomationUseCase,
    @inject(TYPES.Automation.Repository)
    private readonly automationRepository: IAutomationRepository
  ) {}

  async execute(app: App, automation: Automation) {
    this.automationRepository.debug(`setup "${automation.schema.name}"`)

    const exists = await this.automationRepository.status.get(automation.schema.id)
    if (!exists) {
      await this.automationRepository.status.create({
        id: automation.schema.id,
        active: true,
        schema: automation.schema,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    } else if (JSON.stringify(exists.schema) !== JSON.stringify(automation.schema)) {
      await this.automationRepository.status.updateSchema(automation.schema.id, automation.schema)
    }

    // Setup automation
    for (const action of automation.actions) {
      await this.setupActionUseCase.execute(app, action)
    }
    await this.setupTriggerUseCase.execute(app, automation)
    this.runRepository.onCreate(async (run: Run) => {
      if (run.automation_id === automation.schema.id) {
        await this.runAutomationUseCase.execute(app, run, automation)
      }
    })

    // Build OpenAPI routes
    const { trigger } = automation
    let responseAction: ResponseHttpActionSchema | undefined
    if (trigger.event === 'post' || trigger.event === 'get') {
      responseAction = automation.actions.find(
        (action) => action.service === 'http' && action.action === 'response'
      )
    }

    const response =
      responseAction && responseAction.params?.body
        ? this.generateJsonSchema(responseAction.params.body)
        : undefined

    const method = trigger.event === 'get' ? 'get' : 'post'

    const path =
      trigger.params && 'path' in trigger.params
        ? trigger.params.path
        : automation.schema.id.toString()

    this.automationRepository.addOpenAPIRoute({
      summary: `Run "${automation.schema.name}"`,
      method,
      path: '/' + join('automations', path),
      description: `Run the automation "${automation.schema.name}" from a ${method.toUpperCase()} request`,
      tags: [`Trigger ${trigger.service}/${trigger.event}`],
      requestBody:
        trigger.event === 'post' && trigger.params.requestBody
          ? {
              content: {
                'application/json': {
                  schema: this.convertJsonSchemaToOpenApi(trigger.params.requestBody),
                },
              },
            }
          : undefined,
      responses: {
        200: {
          description: 'The automation successfully run',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties:
                  trigger.service === 'http'
                    ? {
                        success: { type: 'boolean' },
                        data: response
                          ? this.convertJsonSchemaToOpenApi(response)
                          : { type: 'object' },
                      }
                    : {
                        success: { type: 'boolean' },
                        runId: { type: 'string' },
                      },
                required: trigger.service === 'http' ? ['success', 'data'] : ['success', 'runId'],
              },
            },
          },
        },
        400: {
          content: {
            'application/json': {
              schema: z.object({
                error: z.string(),
                success: z.boolean().default(false),
              }),
            },
          },
          description: 'The automation failed to run',
        },
      },
    })
  }

  private convertJsonSchemaToOpenApi(schema: SchemaObject): SchemaObject {
    if (Array.isArray(schema.type) && schema.type.includes('null')) {
      schema.type = schema.type.find((t: string) => t !== 'null')
      schema.nullable = true
    }

    if (schema.properties) {
      for (const key in schema.properties) {
        schema.properties[key] = this.convertJsonSchemaToOpenApi(schema.properties[key])
      }
    }

    if (schema.items) {
      schema.items = this.convertJsonSchemaToOpenApi(schema.items)
    }

    delete schema.$id
    delete schema.$schema
    delete schema.definitions // move to components.schemas manually if needed
    delete schema.const // unsupported in OpenAPI 3.0

    return schema
  }

  private isNotEmpty(obj: object): obj is Record<string, unknown> {
    return Object.keys(obj).length > 0
  }

  private inferJsonSchema(value: unknown): SchemaObject {
    if (typeof value === 'string') return { type: 'string' }
    if (typeof value === 'number') return { type: 'number' }
    if (typeof value === 'boolean') return { type: 'boolean' }
    if (Array.isArray(value)) {
      return {
        type: 'array',
        items: value.length > 0 ? this.inferJsonSchema(value[0]) : {},
      }
    }
    if (typeof value === 'object' && value !== null && this.isNotEmpty(value)) {
      return this.generateJsonSchema(value)
    }
    return { type: 'null' }
  }

  private generateJsonSchema(obj: Record<string, unknown>): SchemaObject {
    const properties: Record<string, SchemaObject> = {}
    const required: string[] = []
    for (const [key, value] of Object.entries(obj)) {
      properties[key] = this.inferJsonSchema(value)
      required.push(key)
    }
    return {
      type: 'object',
      properties,
      required,
    }
  }
}

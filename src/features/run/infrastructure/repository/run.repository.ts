import { inject, injectable } from 'inversify'
import TYPES from '../../../../shared/application/di/types'
import type { IRunRepository } from '../../domain/repository-interface/run-repository.interface'
import { EventEmitter } from 'events'
import { Run } from '../../domain/entity/run.entity'
import type { RunDatabaseService } from '../service/database.service'

@injectable()
export class RunRepository implements IRunRepository {
  private eventEmitter = new EventEmitter()

  constructor(
    @inject(TYPES.Run.Service.Database)
    private readonly database: RunDatabaseService
  ) {}

  async create(run: Run) {
    await this.database.run.create({
      id: run.id,
      automation_schema: run.automation_schema,
      status: run.status,
      data: run.data,
      created_at: run.createdAt,
      updated_at: run.updatedAt,
      last_action_name: run.lastActionName,
    })
    this.eventEmitter.emit('create', run)
  }

  onCreate(handler: (run: Run) => Promise<void>) {
    this.eventEmitter.on('create', handler)
  }

  async update(run: Run) {
    await this.database.run.update(run.id, {
      status: run.status,
      data: run.data,
      updated_at: run.updatedAt,
      last_action_name: run.lastActionName,
      error_message: run.errorMessage,
    })
    this.eventEmitter.emit('update', run)
  }

  onUpdate(handler: (run: Run) => Promise<void>) {
    this.eventEmitter.on('update', handler)
  }

  async list(): Promise<Run[]> {
    const runs = await this.database.run.list()
    return runs.map((run) => this.toEntity(run))
  }

  async listPlaying(): Promise<Run[]> {
    const runs = await this.database.run.listPlaying()
    return runs.map((run) => this.toEntity(run))
  }

  async get(id: string): Promise<Run | undefined> {
    const run = await this.database.run.get(id)
    if (!run) return undefined
    return this.toEntity(run)
  }

  async delete(id: string): Promise<void> {
    await this.database.run.delete(id)
  }

  private toEntity(run: typeof this.database.schema.run.$inferSelect): Run {
    return new Run(
      run.automation_schema,
      run.data,
      run.status,
      run.id,
      run.created_at,
      run.updated_at,
      run.last_action_name,
      run.error_message
    )
  }
}

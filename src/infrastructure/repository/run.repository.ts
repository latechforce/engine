import { inject, injectable } from 'inversify'
import type { DatabaseService } from '../service/database.service'
import TYPES from '../di/types'
import type { IRunRepository } from '@/domain/repository-interface/run-repository.interface'
import { EventEmitter } from 'events'
import { type Run, PlayingRun, SuccessRun, StoppedRun } from '@/domain/entity/run'

@injectable()
export class RunRepository implements IRunRepository {
  private eventEmitter = new EventEmitter()

  constructor(
    @inject(TYPES.Service.Database)
    private readonly database: DatabaseService
  ) {}

  async create(run: PlayingRun) {
    await this.database.table.run.create({
      id: run.id,
      automation_schema: run.automation.schema,
      status: run.status,
      data: run.data,
      created_at: run.createdAt,
      updated_at: run.updatedAt,
      last_action_name: run.lastActionName,
    })
    this.eventEmitter.emit('create', run)
  }

  onCreate(handler: (run: PlayingRun) => Promise<void>) {
    this.eventEmitter.on('create', handler)
  }

  async update(run: Run) {
    await this.database.table.run.update(run.id, {
      status: run.status,
      data: run.data,
      updated_at: run.updatedAt,
      last_action_name: run.lastActionName,
      error_message: run instanceof StoppedRun ? run.errorMessage : undefined,
    })
    this.eventEmitter.emit('update', run)
  }

  onUpdate(handler: (run: Run) => Promise<void>) {
    this.eventEmitter.on('update', handler)
  }

  async list(): Promise<Run[]> {
    const runs = await this.database.table.run.list()
    return runs.map((run) => this.toEntity(run))
  }

  async listPlaying(): Promise<PlayingRun[]> {
    const runs = await this.database.table.run.listPlaying()
    return runs.map((run) => this.toEntityPlaying(run))
  }

  async get(id: string): Promise<Run | undefined> {
    const run = await this.database.table.run.get(id)
    if (!run) return undefined
    return this.toEntity(run)
  }

  async delete(id: string): Promise<void> {
    await this.database.table.run.delete(id)
  }

  private toEntity(run: typeof this.database.schema.run.$inferSelect): Run {
    switch (run.status) {
      case 'playing':
        return this.toEntityPlaying(run)
      case 'success':
        return this.toEntitySuccess(run)
      case 'stopped':
        return this.toEntityStopped(run)
    }
  }

  private toEntityPlaying(run: typeof this.database.schema.run.$inferSelect): PlayingRun {
    return new PlayingRun(
      run.automation_schema,
      run.data,
      run.id,
      run.created_at,
      run.updated_at,
      run.last_action_name
    )
  }

  private toEntitySuccess(run: typeof this.database.schema.run.$inferSelect): SuccessRun {
    return new SuccessRun(
      run.automation_schema,
      run.id,
      run.created_at,
      run.updated_at,
      run.data,
      run.last_action_name
    )
  }

  private toEntityStopped(run: typeof this.database.schema.run.$inferSelect): StoppedRun {
    return new StoppedRun(
      run.automation_schema,
      run.id,
      run.created_at,
      run.updated_at,
      run.data,
      run.last_action_name,
      run.error_message ?? ''
    )
  }
}

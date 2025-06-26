import { inject, injectable } from 'inversify'
import TYPES from '../../../../shared/application/di/types'
import type { IRunRepository } from '../../domain/repository-interface/run-repository.interface'
import { Run } from '../../domain/entity/run.entity'
import type { RunDatabaseService } from '../service/database.service'
import { desc, eq, or, and, like, sql } from 'drizzle-orm'
import { EventEmitter } from 'events'

@injectable()
export class RunRepository implements IRunRepository {
  private eventEmitter = new EventEmitter()
  private createListeners: ((run: Run) => Promise<void>)[] = []
  private updateListeners: ((run: Run) => Promise<void>)[] = []

  constructor(
    @inject(TYPES.Run.Service.Database)
    private readonly database: RunDatabaseService
  ) {
    this.eventEmitter.on('created', async (run: Run) => {
      await Promise.all(this.createListeners.map((listener) => listener(run)))
    })
    this.eventEmitter.on('updated', async (run: Run) => {
      await Promise.all(this.updateListeners.map((listener) => listener(run)))
    })
  }

  async create(run: Run) {
    await this.database.run.create({
      id: run.id,
      automation_id: run.automation_id,
      form_id: run.form_id,
      status: run.status,
      steps: run.steps,
      created_at: run.createdAt,
      updated_at: run.updatedAt,
    })
    this.eventEmitter.emit('created', run)
  }

  onCreate(listener: (run: Run) => Promise<void>) {
    this.createListeners.push(listener)
  }

  async update(run: Run) {
    await this.database.run.update(run.id, {
      status: run.status,
      steps: run.steps,
      updated_at: run.updatedAt,
    })
    this.eventEmitter.emit('updated', run)
  }

  onUpdate(listener: (run: Run) => Promise<void>) {
    this.updateListeners.push(listener)
  }

  private whereQuery(query?: string) {
    if (!query) return undefined
    const q = `%${query}%`
    const isPostgres = this.database.provider === 'postgres'
    const schema = this.database.schema.run
    return or(
      like(schema.id, q),
      like(schema.status, q),
      isPostgres ? sql`${schema.steps}::text ILIKE ${q}` : like(schema.steps, q)
    )
  }

  async list(query?: string): Promise<Run[]> {
    const runs = await this.database.run.list({
      where: this.whereQuery(query),
      orderBy: desc(this.database.schema.run.created_at),
    })
    return runs.map((run) => this.toEntity(run))
  }

  async listByAutomationId(automationId: number, query?: string): Promise<Run[]> {
    const runs = await this.database.run.list({
      where: and(eq(this.database.schema.run.automation_id, automationId), this.whereQuery(query)),
      orderBy: desc(this.database.schema.run.created_at),
    })
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
      run.automation_id,
      run.steps,
      run.form_id,
      run.status,
      run.id,
      run.created_at,
      run.updated_at
    )
  }
}

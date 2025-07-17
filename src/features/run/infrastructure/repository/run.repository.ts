import { inject, injectable } from 'inversify'
import TYPES from '../../../../shared/application/di/types'
import type {
  IRunRepository,
  ListRunsParams,
} from '../../domain/repository-interface/run-repository.interface'
import { Run, type RunStatus } from '../../domain/entity/run.entity'
import type { RunDatabaseService } from '../service/database.service'
import { desc, eq, or, and, like, sql, inArray } from 'drizzle-orm'
import { EventEmitter } from 'events'
import type { LoggerService } from '../../../../shared/infrastructure/service/logger.service'

@injectable()
export class RunRepository implements IRunRepository {
  private eventEmitter = new EventEmitter()
  private createListeners: ((run: Run) => Promise<void>)[] = []
  private updateListeners: ((run: Run) => Promise<void>)[] = []

  constructor(
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
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

  debug(message: string) {
    this.logger.child('run-repository').debug(message)
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

  private whereQuery(search?: string, automationsIdsFiltered: number[] = []) {
    if (!search) return undefined
    const q = `%${search}%`
    const isPostgres = this.database.provider === 'postgres'
    const schema = this.database.schema.run
    return or(
      like(schema.id, q),
      like(schema.status, q),
      isPostgres ? sql`${schema.steps}::text ILIKE ${q}` : like(schema.steps, q),
      ...(automationsIdsFiltered.length > 0
        ? [inArray(schema.automation_id, automationsIdsFiltered)]
        : [])
    )
  }

  async list(params: ListRunsParams, automationsIdsFiltered: number[] = []) {
    const whereClause = ['success', 'stopped', 'filtered'].includes(params.status)
      ? and(
          eq(this.database.schema.run.status, params.status as RunStatus),
          this.whereQuery(params.search, automationsIdsFiltered)
        )
      : this.whereQuery(params.search, automationsIdsFiltered)
    const totalCount = await this.database.run.count(whereClause)
    const runs = await this.database.run.list({
      where: whereClause,
      orderBy: desc(this.database.schema.run.created_at),
      limit: params.pageSize,
      offset: params.pageIndex * params.pageSize,
    })
    return {
      runs: runs.map((run) => this.toEntity(run)),
      totalCount,
    }
  }

  async listAllByIdsAndStatus(ids: string[], status: RunStatus) {
    const runs = await this.database.run.list({
      where: and(
        inArray(this.database.schema.run.id, ids),
        eq(this.database.schema.run.status, status)
      ),
      orderBy: desc(this.database.schema.run.created_at),
    })
    return runs.map((run) => this.toEntity(run))
  }

  async listByAutomationId(automationId: number, params: ListRunsParams) {
    const whereClause = and(
      eq(this.database.schema.run.automation_id, automationId),
      ['success', 'stopped', 'filtered'].includes(params.status)
        ? and(
            eq(this.database.schema.run.status, params.status as RunStatus),
            this.whereQuery(params.search)
          )
        : this.whereQuery(params.search)
    )
    const totalCount = await this.database.run.count(whereClause)
    const runs = await this.database.run.list({
      where: whereClause,
      orderBy: desc(this.database.schema.run.created_at),
      limit: params.pageSize,
      offset: params.pageIndex * params.pageSize,
    })
    return {
      runs: runs.map((run) => this.toEntity(run)),
      totalCount,
    }
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

import { beforeEach, describe, expect, it } from 'bun:test'
import { registerDependencies } from '../../../../src/shared/infrastructure/di/container'
import TYPES from '../../../../src/shared/application/di/types'
import type { QueueService } from '../../../../src/features/action/infrastructure/service/queue.service'
import { differenceInSeconds } from 'date-fns'

describe('QueueService', () => {
  let queueService: QueueService

  beforeEach(async () => {
    const container = await registerDependencies({}, {} as any)
    queueService = container.get<QueueService>(TYPES.Action.Service.Queue)
  })

  it('should wait for a job to finish', async () => {
    const job = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return 'Hello, World!'
    }
    const result = await queueService.wait('test', job)
    expect(result).toBe('Hello, World!')
  })

  it('should wait for multiple jobs to finish with a 1 second delay', async () => {
    const jobs = Array.from({ length: 3 }, (_, i) => async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { text: `Hello, World! ${i}`, date: new Date() }
    })
    const result = await Promise.all(jobs.map((job) => queueService.wait('test', job)))
    expect(result).toEqual([
      { text: 'Hello, World! 0', date: expect.any(Date) },
      { text: 'Hello, World! 1', date: expect.any(Date) },
      { text: 'Hello, World! 2', date: expect.any(Date) },
    ])
    const diff1 = Math.abs(differenceInSeconds(result[0]!.date, result[1]!.date))
    expect(diff1).toBeGreaterThanOrEqual(1)
    const diff2 = Math.abs(differenceInSeconds(result[0]!.date, result[2]!.date))
    expect(diff2).toBeGreaterThanOrEqual(1)
    const diff3 = Math.abs(differenceInSeconds(result[1]!.date, result[2]!.date))
    expect(diff3).toBeGreaterThanOrEqual(1)
  })
})

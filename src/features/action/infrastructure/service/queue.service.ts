import { injectable } from 'inversify'

type Job<T> = () => Promise<T>

@injectable()
export class QueueService {
  private readonly queue: Map<string, Promise<void>> = new Map()
  private readonly lastStartTime: Map<string, number> = new Map()

  async wait<T>(key: string, job: Job<T>): Promise<T> {
    const previous = this.queue.get(key) ?? Promise.resolve()

    const current = previous
      .catch(() => {}) // ignore previous job errors
      .then(async () => {
        const now = Date.now()
        const lastStart = this.lastStartTime.get(key)

        // If there's a recorded start time, and we're under 1s since then, wait
        if (lastStart !== undefined) {
          const diff = now - lastStart
          if (diff < 1000) {
            await new Promise((r) => setTimeout(r, 1000 - diff))
          }
        }

        this.lastStartTime.set(key, Date.now()) // mark job start time

        return job()
      })

    // Store only completion in the queue
    this.queue.set(
      key,
      current.then(
        () => {},
        () => {}
      )
    )

    return current
  }
}

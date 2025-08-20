export class SimpleContainer {
  private services = new Map<string, unknown>()

  set<T>(key: string, instance: T): void {
    this.services.set(key, instance)
  }

  get<T>(key: string): T {
    const service = this.services.get(key)
    if (!service) {
      throw new Error(`Service not found: ${key}`)
    }
    return service as T
  }

  has(key: string): boolean {
    return this.services.has(key)
  }

  clear(): void {
    this.services.clear()
  }
}

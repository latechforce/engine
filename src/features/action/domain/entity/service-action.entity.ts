import type { ServiceActionSchema } from '../schema/service'

export class ServiceAction {
  constructor(
    public readonly schema: ServiceActionSchema,
    public readonly automationName: string
  ) {}
}

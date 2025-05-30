// Third-party imports
import { inject, injectable } from 'inversify'
import type { Context } from 'hono'

// Trigger application imports
import type { HttpTriggeredUseCase } from '@/trigger/application/use-case/http-triggered.use-case'
import TYPES from '../../application/di/types'

export type TriggerHonoContextType = {
  httpTriggeredUseCase: HttpTriggeredUseCase
}

@injectable()
export class TriggerHonoContext {
  constructor(
    @inject(TYPES.UseCase.Http)
    private readonly httpTriggeredUseCase: HttpTriggeredUseCase
  ) {}

  setVariables(c: Context) {
    c.set('httpTriggeredUseCase', this.httpTriggeredUseCase)
  }
}

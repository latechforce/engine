import type { HttpTriggeredUseCase } from '@/trigger/application/use-case/http-triggered.use-case'
import { inject, injectable } from 'inversify'
import TYPES from '../../application/di/types'
import type { Context } from 'hono'

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

import { Container } from 'inversify'
import TYPES from './types'
import { ListFormsUseCase } from '@/form/application/use-case/list-forms.use-case'
import { FormHonoContext } from './context'
import { GetFormUseCase } from '@/form/application/use-case/get-form.use-case'

export function registerFormDependencies(container: Container) {
  // Register use cases
  container.bind<ListFormsUseCase>(TYPES.UseCase.List).to(ListFormsUseCase).inSingletonScope()
  container.bind<GetFormUseCase>(TYPES.UseCase.Get).to(GetFormUseCase).inSingletonScope()

  // Register context
  container.bind<FormHonoContext>(TYPES.HonoContext).to(FormHonoContext).inSingletonScope()

  return container
}

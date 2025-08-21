// Use Cases
import { ListFormsUseCase } from '../application/use-case/list-forms.use-case'
import { GetFormUseCase } from '../application/use-case/get-form.use-case'

// Context
import { FormHonoContext } from './di/context'
import type { SimpleContainer } from '../../../shared/infrastructure/di/simple-container'

export interface FormServices {
  useCases: {
    list: ListFormsUseCase
    get: GetFormUseCase
  }
  context: FormHonoContext
}

export function createFormServices(_container: SimpleContainer): FormServices {
  // Create use cases
  const listUseCase = new ListFormsUseCase()
  const getUseCase = new GetFormUseCase()

  // Create context
  const context = new FormHonoContext(listUseCase, getUseCase)

  return {
    useCases: {
      list: listUseCase,
      get: getUseCase,
    },
    context,
  }
}

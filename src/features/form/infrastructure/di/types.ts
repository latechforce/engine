const TYPES = {
  HonoContext: Symbol.for('FormHonoContext'),
  Repository: Symbol.for('IFormRepository'),
  UseCase: {
    List: Symbol.for('ListFormsUseCase'),
    Get: Symbol.for('GetFormUseCase'),
  },
}

export default TYPES

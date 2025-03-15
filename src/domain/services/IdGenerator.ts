export interface IIdGeneratorSpi {
  generate: (length: number, chars: string) => string
}

export class IdGenerator {
  private _alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  private _alphabetWithNumbers = '0123456789' + this._alphabet

  constructor(private _spi: IIdGeneratorSpi) {}

  forRecord = () => {
    return 'rec' + this._spi.generate(24, this._alphabetWithNumbers)
  }

  forFile = () => {
    return 'fil' + this._spi.generate(24, this._alphabetWithNumbers)
  }

  forComponent = () => {
    return 'com' + this._spi.generate(12, this._alphabet)
  }

  forListener = () => {
    return 'lis' + this._spi.generate(12, this._alphabetWithNumbers)
  }
}

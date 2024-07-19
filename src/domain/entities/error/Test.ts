export interface Params {
  code: string
  name?: string
  expected?: string | number | boolean | object
  received?: string | number | boolean | object
}

export class TestError {
  public code: string
  public name?: string
  public expected?: string | number | boolean | object
  public received?: string | number | boolean | object

  constructor(params: Params) {
    this.code = params.code
    this.name = params.name
    this.expected = params.expected
    this.received = params.received
  }

  setName = (name: string) => {
    this.name = name
  }
}

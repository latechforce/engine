export type Mock = {
  [path: string]: {
    [method: string]: (request: Request) => { json: object; status?: number }
  }
}

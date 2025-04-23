type Base = {
  path: string
  baseUrl: string
  headers?: { [key: string]: string | undefined }
  query?: { [key: string]: string | undefined }
  params?: { [key: string]: string }
}

export type GetDto = Base & {
  method: 'GET'
}

export type PostDto = Base & {
  method: 'POST'
  body: unknown
}

export type PatchDto = Base & {
  method: 'PATCH'
  body: unknown
}

export type DeleteDto = Base & {
  method: 'DELETE'
}

export type RequestDto = GetDto | PostDto | PatchDto | DeleteDto

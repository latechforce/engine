import type { GetRequest } from './Get'
import type { PostRequest } from './Post'
import type { PatchRequest } from './Patch'
import type { DeleteRequest } from './Delete'
import type { Headers } from './base'

export type Request = GetRequest | PostRequest | PatchRequest | DeleteRequest

export type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

export type { GetRequest, PostRequest, PatchRequest, DeleteRequest, Headers }

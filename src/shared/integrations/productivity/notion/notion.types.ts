import type { Client } from '@notionhq/client'
import type {
  UpdatePageParameters,
  PageObjectResponse,
  UserObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

export type NotionClient = Client
export type { UpdatePageParameters, PageObjectResponse, UserObjectResponse }

export type NotionTokenResponse = {
  access_token: string
  token_type: string
  bot_id: string
  workspace_name: string
  workspace_icon?: string
  workspace_id: string
  owner?: {
    type: 'workspace' | 'user'
    user?: {
      object: 'user'
      id: string
      name: string
      avatar_url?: string
      type: 'person'
      person: {
        email: string
      }
    }
    workspace?: boolean
  }
  duplicated_template_id?: string | null
}

import type { Server } from '@domain/services/Server'
import type { Component } from '../Component'
import type { Logger } from '@domain/services/Logger'
import type { Head } from '../Head'
import { HtmlResponse } from '@domain/entities/Response/Html'
import { PageState } from './State'
import type { GetRequest } from '@domain/entities/Request/Get'
import type { Client } from '@domain/services/Client'

export interface PageConfig {
  name: string
  path: string
}

export interface PageServices {
  server: Server
  logger: Logger
  client: Client
}

export interface PageEntities {
  head: Head
  body: Component[]
}

export class Page {
  readonly name: string
  readonly path: string

  constructor(
    config: PageConfig,
    private _services: PageServices,
    private _entities: PageEntities
  ) {
    const { name, path } = config
    this.name = name
    this.path = path
  }

  init = async () => {
    const { server } = this._services
    const { body } = this._entities
    await Promise.all(body.map((component) => component.init()))
    if (this.path === '/404') {
      await server.notFound(this.get)
    } else {
      await server.get(this.path, this.get)
    }
  }

  validateConfig = async () => {
    const { body } = this._entities
    return Promise.all(body.flatMap((component) => component.validateConfig()))
  }

  get = async (request: GetRequest) => {
    const state = new PageState(request)
    return new HtmlResponse(await this.html(state))
  }

  html = async (state: PageState) => {
    const { client } = this._services
    return client.renderToHtml(await this.render(state))
  }

  htmlWithSampleProps = async (state: PageState) => {
    const { body } = this._entities
    const { client } = this._services
    const html = await Promise.all(
      body.map(async (component) => {
        if ('renderWithSamples' in component) {
          const components = await component.renderWithSamples(state)
          return components.map((Component) => client.renderToHtml(Component))
        }
        const Component = await component.render(state)
        return client.renderToHtml(<Component />)
      })
    )
    return html.flat().join('')
  }

  render = async (state: PageState) => {
    const { body, head } = this._entities
    const { components } = this._services.client
    const children = await Promise.all(body.map((component) => component.render(state)))
    return (
      <components.Html
        head={head ? head.render() : null}
        body={children.map((Component, index) => (
          <Component key={index} />
        ))}
      />
    )
  }
}

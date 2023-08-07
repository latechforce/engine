import { Component } from '@domain/entities/page/Component'
import { List } from '@domain/entities/page/components/List'
import { Navigation } from '@domain/entities/page/components/Navigation'
import { RenderPageList } from './RenderPageList'
import { RenderPageNavigation } from './RenderPageNavigation'
import { RenderPageForm } from './RenderPageForm'
import { Form } from '@domain/entities/page/components/Form'
import { Context } from '@domain/entities/page/Context'
import { FetcherGatewayAbstract } from '@application/gateways/FetcherGatewayAbstract'
import { App } from '@domain/entities/app/App'

export class RenderPageComponent {
  constructor(
    private fetcherGateway: FetcherGatewayAbstract,
    private app: App
  ) {}

  async execute(component: Component, context: Context): Promise<() => JSX.Element> {
    if (component instanceof Navigation) {
      const renderPageNavigation = new RenderPageNavigation(this.fetcherGateway, this.app)
      return renderPageNavigation.execute(component, context)
    }
    if (component instanceof List) {
      const renderPageList = new RenderPageList(this.fetcherGateway)
      return renderPageList.execute(component)
    }
    if (component instanceof Form) {
      const renderPageForm = new RenderPageForm(this.fetcherGateway, this.app)
      return renderPageForm.execute(component, context)
    }
    return component.renderUI()
  }
}

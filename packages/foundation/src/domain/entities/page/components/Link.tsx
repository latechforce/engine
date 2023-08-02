import React from 'react'
import { IUIGateway } from '@domain/gateways/IUIGateway'
import { BaseComponent } from './BaseComponent'

export class Link extends BaseComponent {
  constructor(
    private readonly _path: string = '#',
    private readonly _label: string = '',
    private readonly _ui: IUIGateway['LinkUI']
  ) {
    super('link')
  }

  get path(): string {
    return this._path
  }

  get label(): string {
    return this._label
  }

  renderUI() {
    const UI = this._ui
    const path = this._path
    const label = this._label
    return function Component() {
      return <UI href={path}>{label}</UI>
    }
  }
}
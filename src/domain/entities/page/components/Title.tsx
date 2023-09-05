import React from 'react'
import { BaseComponent } from './BaseComponent'
import { TitleUI } from '../../../spi/ui/TitleUI'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export class Title extends BaseComponent {
  constructor(
    private readonly _text: string,
    private readonly _ui: TitleUI,
    private readonly _size: Size = 'md'
  ) {
    super('title')
  }

  get text(): string {
    return this._text
  }

  get size(): Size {
    return this._size
  }

  renderUI() {
    const UI = this._ui
    const text = this.text
    const size = this.size
    return function TitleUI() {
      switch (size) {
        case 'xs':
          return <UI.xs>{text}</UI.xs>
        case 'sm':
          return <UI.sm>{text}</UI.sm>
        case 'md':
          return <UI.md>{text}</UI.md>
        case 'lg':
          return <UI.lg>{text}</UI.lg>
        case 'xl':
          return <UI.xl>{text}</UI.xl>
        default:
          return <UI.md>{text}</UI.md>
      }
    }
  }
}
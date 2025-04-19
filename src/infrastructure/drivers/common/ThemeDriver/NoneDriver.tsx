import type { IThemeDriver } from '/adapter/spi/drivers/ThemeSpi'

export class NoneDriver implements IThemeDriver {
  constructor() {}

  loadCssFiles = async (): Promise<{ name: string; content: string }[]> => {
    return []
  }

  loadJsFiles = async (): Promise<{ name: string; content: string }[]> => {
    return []
  }

  icon = (icon: string): React.ReactNode => {
    return <span>{icon}</span>
  }
}

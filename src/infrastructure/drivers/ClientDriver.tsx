import type { IClientDriver } from '@adapter/spi/drivers/ClientSpi'
import type {
  ClientActionProps,
  ClientFrameProps,
  ClientStreamProps,
  ClientStreamSourceProps,
} from '@domain/services/Client'
import { components } from '@infrastructure/components'
import ReactDOMServer from 'react-dom/server'

export class ClientDriver implements IClientDriver {
  constructor() {}

  get metas() {
    return [
      {
        name: 'turbo-refresh-method',
        content: 'morph',
      },
      {
        name: 'turbo-refresh-scroll',
        content: 'preserve',
      },
    ]
  }

  get components() {
    return components
  }

  render = (component: JSX.Element) => {
    return ReactDOMServer.renderToString(component)
  }

  getActionProps = (options?: ClientActionProps) => {
    const { reloadPageFrame = false, redirectPage = false } = options || {}
    const props: {
      'data-turbo-frame'?: string
      'data-turbo-action'?: string
    } = {}
    if (reloadPageFrame) props['data-turbo-frame'] = '_top'
    if (redirectPage) props['data-turbo-action'] = 'replace'
    return props
  }

  Frame = ({ navigation, frameId, children, ...props }: ClientFrameProps) => {
    return (
      <turbo-frame data-turbo-action={navigation} target={frameId} {...props}>
        {children}
      </turbo-frame>
    )
  }

  Stream = ({ action, target, children }: ClientStreamProps) => {
    return (
      <turbo-stream action={action} target={target}>
        <template>{children}</template>
      </turbo-stream>
    )
  }

  StreamSource = (props: ClientStreamSourceProps) => {
    return <turbo-stream-source {...props} />
  }
}

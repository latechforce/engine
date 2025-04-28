import fs from 'fs-extra'
import type { IClientDriver } from '/adapter/spi/drivers/ClientSpi'
import type { ClientHtmlAttributesOptions } from '/domain/services/Client'
import type { Headers } from '/domain/entities/Request'

export class ClientDriver implements IClientDriver {
  readJsFiles = async (): Promise<{ name: string; content: string }[]> => {
    const output = await fs.readFile(require.resolve('htmx.org/dist/htmx.js'), 'utf8')
    return [{ name: 'htmx.js', content: output }]
  }

  getHtmlAttributes = (options: ClientHtmlAttributesOptions): Record<string, string> => {
    const { post, get, target, action, trigger, fileUpload, pushUrl, values } = options
    const attributes: Record<string, string> = {}
    if (post) attributes['hx-post'] = post
    if (get) attributes['hx-get'] = get
    if (target) attributes['hx-target'] = target
    if (pushUrl) attributes['hx-push-url'] = pushUrl
    if (values) attributes['hx-vals'] = values
    if (fileUpload) attributes['hx-encoding'] = 'multipart/form-data'
    switch (trigger) {
      case 'revealed':
        attributes['hx-trigger'] = 'revealed'
        break
    }
    switch (action) {
      case 'replace':
        attributes['hx-swap'] = 'outerHTML'
        break
      case 'append':
        attributes['hx-swap'] = 'beforeend'
        break
      case 'prepend':
        attributes['hx-swap'] = 'beforebegin'
        break
    }
    return attributes
  }

  getTargetIdFromHeaders = (headers: Headers): string | undefined => {
    return headers['hx-target']
  }
}

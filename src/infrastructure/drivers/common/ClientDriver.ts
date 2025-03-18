import fs from 'fs-extra'
import type { IClientDriver } from '/adapter/spi/drivers/ClientSpi'
import type { ClientHtmlAttributesOptions } from '/domain/services/Client'

export class ClientDriver implements IClientDriver {
  getJs = async (): Promise<string> => {
    const output = await fs.readFile(require.resolve('htmx.org/dist/htmx.js'), 'utf8')
    return output
  }

  getHtmlAttributes = (options: ClientHtmlAttributesOptions): Record<string, string> => {
    const { post, target, action, fileUpload } = options
    const attributes: Record<string, string> = {}
    if (post) attributes['hx-post'] = post
    if (target) attributes['hx-target'] = target
    if (fileUpload) attributes['hx-encoding'] = 'multipart/form-data'
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
}

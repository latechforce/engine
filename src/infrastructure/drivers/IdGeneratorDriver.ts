import type { Driver } from '@adapter/spi/drivers/IdGeneratorSpi'
import { customAlphabet } from 'nanoid'

export class IdGeneratorDriver implements Driver {
  generate = (length: number, alphabet: string) => {
    return customAlphabet(alphabet, length)()
  }
}

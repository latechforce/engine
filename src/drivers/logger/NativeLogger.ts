import { ILoggerSpi } from '@entities/drivers/logger/ILoggerSpi'

export const NativeLogger: ILoggerSpi = (message: string) => {
  console.log(message)
}
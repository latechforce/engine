import { createLogger, format, transports } from 'winston'
import { BaseLoggerDriver } from './base'
import type { LoggerConsoleConfig } from '/domain/services/Logger'

export class ConsoleDriver extends BaseLoggerDriver {
  constructor(config: LoggerConsoleConfig) {
    const logger = createLogger({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          if (process.env.NODE_ENV === 'production') {
            return `[${level}]: ${message}`
          }
          return `${timestamp} [${level}]: ${message}`
        })
      ),
      transports: [new transports.Console(config)],
    })
    super(logger)
  }
}

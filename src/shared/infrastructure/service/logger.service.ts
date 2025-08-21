// External dependencies
import { createLogger, format, transports, type Logger } from 'winston'

// Internal dependencies
import { EnvService } from './env.service'

export class LoggerService {
  public logger: Logger

  constructor(
    private readonly env?: EnvService,
    private readonly childLogger?: Logger
  ) {
    if (this.childLogger) {
      this.logger = this.childLogger
    } else {
      this.logger = createLogger({
        level: this.env?.get('LOG_LEVEL') || 'info',
        silent: this.env?.get('LOG_LEVEL') === 'silent',
        format: format.combine(
          format.colorize(),
          format.timestamp(),
          format.printf(({ timestamp, level, message, name }) => {
            if (this.env?.get('NODE_ENV') === 'production') {
              return `[${level}${name ? `: ${name}` : ''}]: ${message}`
            }
            return `${timestamp} [${level}${name ? `: ${name}` : ''}] ${message}`
          })
        ),
        transports: [new transports.Console()],
      })
    }
  }

  child(name: string) {
    const childLogger = this.logger.child({ name })
    return new LoggerService(this.env, childLogger)
  }

  debug(message: string) {
    this.logger.debug(message)
  }

  info(message: string) {
    this.logger.info(message)
  }

  http(message: string) {
    this.logger.http(message)
  }

  error(message: string) {
    this.logger.error(message)
  }
}

import { createLogger, format, transports, type Logger } from 'winston'
import { EnvService } from './env.service'
import TYPES from '../../application/di/types'
import { injectable, inject, unmanaged } from 'inversify'

@injectable()
export class LoggerService {
  public logger!: Logger

  constructor(
    @inject(TYPES.Service.Env)
    private readonly env: EnvService,
    @unmanaged()
    private readonly childLogger: Logger
  ) {
    if (this.childLogger) {
      this.logger = this.childLogger
    } else {
      this.logger = createLogger({
        level: this.env.get('LOG_LEVEL'),
        silent: this.env.get('LOG_LEVEL') === 'silent',
        format: format.combine(
          format.colorize(),
          format.timestamp(),
          format.printf(({ timestamp, level, message, name }) => {
            if (this.env.get('NODE_ENV') === 'production') {
              return `[${level}]: ${message}`
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

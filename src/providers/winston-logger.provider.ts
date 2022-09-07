import {config} from '@loopback/core';
import {createLogger, format, Logger, transports} from 'winston';

export class WinstonLoggerProvider {
  private config = {
    format: format.combine(format.splat(), format.simple()),
    transports: [
      new transports.Console(),
      new transports.File({level: 'info', filename: 'info.log'}),
    ],
  };

  public logger: Logger;
  constructor(@config() options: {}) {
    this.logger = createLogger(this.config);
  }

  log(type: string, message: string): void {
    this.logger.log(type, message);
  }
}

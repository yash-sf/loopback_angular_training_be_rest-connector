import {BindingKey, Component} from '@loopback/core';
import {WinstonLoggerProvider} from '../providers/winston-logger.provider';

export namespace LoggingBindings {
  export const LOGGING_ACTION =
    BindingKey.create<WinstonLoggerProvider>('winston-logger');
}

export class LoggingComponent implements Component {
  public providers: any;
  constructor() {
    this.providers = {
      [LoggingBindings.LOGGING_ACTION.key]: WinstonLoggerProvider,
    };
  }
}

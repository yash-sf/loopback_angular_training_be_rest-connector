import {inject} from '@loopback/core';
import {
  FindRoute,
  InvokeMethod,
  parseOperationArgs,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
} from '@loopback/rest';
import {WinstonLoggerProvider} from './providers/winston-logger.provider';

export class AppSequence implements SequenceHandler {
  constructor(
    @inject(RestBindings.SequenceActions.FIND_ROUTE)
    protected findRoute: FindRoute,
    @inject(RestBindings.SequenceActions.INVOKE_METHOD)
    protected invoke: InvokeMethod,
    @inject(RestBindings.SequenceActions.SEND) public send: Send,
    @inject('winston-logger')
    protected logger: WinstonLoggerProvider,
  ) {}

  async handle(context: RequestContext): Promise<void> {
    const {request, response} = context;
    const route = this.findRoute(request);

    // Use prepared logger
    this.logger.log('info', `Host Name: ${request.hostname}`);

    const args = await parseOperationArgs(request, route);
    const result = await this.invoke(route, args);
    this.send(response, result);
  }
}

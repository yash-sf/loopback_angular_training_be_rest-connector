import {config, inject} from '@loopback/core';
import {
  FindRoute,
  InvokeMethod,
  InvokeMiddleware,
  InvokeMiddlewareOptions,
  MiddlewareSequence,
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
    @config()
    readonly options: InvokeMiddlewareOptions = MiddlewareSequence.defaultOptions,
    @inject(RestBindings.SequenceActions.INVOKE_MIDDLEWARE)
    protected invokeMiddleware: InvokeMiddleware,
    @inject(RestBindings.SequenceActions.INVOKE_METHOD)
    protected invoke: InvokeMethod,
    @inject(RestBindings.SequenceActions.SEND) public send: Send,
    @inject('winston-logger')
    protected logger: WinstonLoggerProvider,
  ) {}

  async handle(context: RequestContext): Promise<void> {
    const {request, response} = context;
    await this.invokeMiddleware(context, this.options);

    // Use prepared logger
    this.logger.log('info', `Host Name: ${request.hostname}`);
    const route = this.findRoute(request);
    const args = await parseOperationArgs(request, route);
    const result = await this.invoke(route, args);
    this.send(response, result);
  }
}

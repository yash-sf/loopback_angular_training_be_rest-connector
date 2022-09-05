import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {OpenapiDataSource} from '../datasources';
import {UserNewProxy} from '../proxies/user-new.proxy';

export class UserNewProxyProvider implements Provider<UserNewProxy> {
  constructor(
    @inject('datasources.openapi')
    protected dataSource: OpenapiDataSource,
  ) {}

  value(): Promise<UserNewProxy> {
    return getService(this.dataSource);
  }
}

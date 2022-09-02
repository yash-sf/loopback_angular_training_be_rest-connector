import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {RestconnectorDataSource} from '../datasources';
import {UserNewProxy} from '../proxies/user-new.proxy';

export class UserNewProxyProvider implements Provider<UserNewProxy> {
  constructor(
    @inject('datasources.restconnector')
    protected dataSource: RestconnectorDataSource,
  ) {}

  value(): Promise<UserNewProxy> {
    return getService(this.dataSource);
  }
}

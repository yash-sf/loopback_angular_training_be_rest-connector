import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {RestconnectorDataSource} from '../datasources';
import {UserNew} from '../models';

export class UserConsumerRepository extends DefaultCrudRepository<
  UserNew,
  typeof UserNew.prototype.id
> {
  constructor(
    @inject('datasources.restconnector') dataSource: RestconnectorDataSource,
  ) {
    super(UserNew, dataSource);
  }
}

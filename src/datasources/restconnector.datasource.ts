import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const baseUrl = 'http://[::1]:3000/';

const config = {
  name: 'restconnector',
  connector: 'rest',
  baseURL: baseUrl,
  crud: false,
  operations: [
    {
      template: {
        method: 'POST',
        url: `${baseUrl}user-new`,
        body: '{body}',
      },
      functions: {
        create: ['body'],
      },
    },
    {
      template: {
        method: 'GET',
        url: `${baseUrl}user-new`,
      },
      functions: {
        find: [],
      },
    },
    {
      template: {
        method: 'GET',
        url: `${baseUrl}user-new/{id}`,
      },
      functions: {
        findById: ['id'],
      },
    },
    {
      template: {
        method: 'PUT',
        url: `${baseUrl}user-new/{id}`,
        body: '{body}',
      },
      functions: {
        replaceById: ['id', 'body'],
      },
    },
    {
      template: {
        method: 'DELETE',
        url: `${baseUrl}user-new/{id}`,
      },
      functions: {
        delete: ['id'],
      },
    },
  ],
};

@lifeCycleObserver('datasource')
export class RestconnectorDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'restconnector';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.restconnector', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

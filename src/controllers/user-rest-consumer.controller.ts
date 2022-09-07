import {BindingKey} from '@loopback/context';
import {inject} from '@loopback/core';
import {Filter} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  put,
  Request,
  requestBody,
  response,
  RestBindings,
} from '@loopback/rest';
import {UserNew} from '../models';
import {UserNewProxy} from '../proxies/user-new.proxy';

const UserProxyKey = BindingKey.create('services.UserNewProxy');

export class UserRestConsumerController {
  constructor(
    @inject(UserProxyKey)
    public userNewProxy: UserNewProxy,
    @inject(RestBindings.Http.REQUEST) private request: Request,
  ) {}

  @post('/user-consumer')
  @response(200, {
    description: 'UserNew model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserNew)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserNew, {
            title: 'NewUserNew',
            exclude: ['id'],
          }),
        },
      },
    })
    userNew: UserNew,
  ): Promise<UserNew> {
    console.log(userNew);
    return this.userNewProxy.create(userNew);
  }

  @get('/user-consumer')
  @response(200, {
    description: 'Array of UserNew model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserNew, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(UserNew) filter?: Filter<UserNew>) {
    console.log(this.request.headers);
    return this.userNewProxy.find(filter);
  }

  @get('/user-consumer/{id}')
  @response(200, {
    description: 'UserNew model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserNew, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserNew) filter?: Filter<UserNew>,
  ): Promise<UserNew> {
    return this.userNewProxy.findById(id, filter);
  }

  @put('/user-consumer/{id}')
  @response(204, {
    description: 'UserNew PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userNew: UserNew,
  ): Promise<void> {
    await this.userNewProxy.replaceById(id, userNew);
  }

  @del('/user-consumer/{id}')
  @response(204, {
    description: 'UserNew DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userNewProxy.delete(id);
  }
}

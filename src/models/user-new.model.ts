import {Entity, model, property} from '@loopback/repository';

@model()
export class UserNew extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  website?: string;

  @property({
    type: 'number',
    required: true,
  })
  role_id: number;

  [prop: string]: any;

  constructor(data?: Partial<UserNew>) {
    super(data);
  }
}

export interface UserNewRelations {}

export type UserNewWithRelations = UserNew & UserNewRelations;
